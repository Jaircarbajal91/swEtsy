from app.models import db, Product
from datetime import date, timedelta, datetime
import random
import requests
import re
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed

ALLOWED_CATEGORIES = {
    "clothes", "clothing", "apparel", "women", "men", "shoes", "bags", "fashion",
    "jewelry", "accessories", "watches", "eyewear",
    "home", "home-decor", "decor", "furniture", "lighting",
    "art", "prints", "crafts", "handmade",
    "beauty", "cosmetics", "skincare", "fragrance",
    "toys", "games", "kids", "baby",
    "stationery", "office", "paper",
    "vintage", "retro", "collectibles",
    "tech", "gadgets", "phone", "laptop", "electronics", "accessories"
}

FOOD_KEYWORDS = [
    "food", "drink", "beverage", "snack", "candy", "chocolate", "coffee", "tea", "juice",
    "sauce", "spice", "condiment", "cereal", "pasta", "bread", "cookie", "cake", "pie",
    "meat", "chicken", "beef", "pork", "fish", "seafood", "dairy", "cheese", "yogurt",
    "vegan", "gluten", "organic food", "nutrition", "calories", "ingredients", "kcal"
]

MAX_FOOD_RATIO = 0.05

PER_SOURCE_SOFT_CAP = {
    "escuelajs": 700,
    "dummyjson": 300,
    "fakestore": 100,
    "openbeautyfacts": 300
}

def looks_like_food(name, description, category):
    text = " ".join([str(name or ""), str(description or ""), str(category or "")]).lower()
    return any(k in text for k in FOOD_KEYWORDS)

def category_is_allowed(category):
    c = str(category or "").lower().replace(" & ", " ").replace("/", " ")
    return any(a in c for a in ALLOWED_CATEGORIES)

def slug(text):
    if not text:
        return ''
    text = str(text).lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

def is_good_image(url):
    if not url or not isinstance(url, str):
        return False
    
    if not (url.startswith('http://') or url.startswith('https://')):
        return False
    
    try:
        parsed = urlparse(url)
        host = parsed.netloc.lower()
        
        placeholder_hosts = [
            'picsum.photos',
            'placeimg.com',
            'lorempixel.com',
            'loremflickr.com',
            'dummyimage.com',
            'via.placeholder.com',
            'source.unsplash.com'
        ]
        
        for ph_host in placeholder_hosts:
            if ph_host in host:
                return False
    except Exception:
        return False
    
    try:
        response = requests.head(url, timeout=5, allow_redirects=True)
        
        if response.status_code not in range(200, 300):
            return False
        
        content_type = response.headers.get('Content-Type', '').lower()
        if not content_type.startswith('image/'):
            return False
        
        content_length = response.headers.get('Content-Length')
        if content_length:
            try:
                size = int(content_length)
                if size < 1024:
                    return False
            except (ValueError, TypeError):
                pass
        
        return True
    except Exception:
        return False

def normalize_product(api_data, source):
    name = api_data.get('title') or api_data.get('name') or api_data.get('product_name')
    if not name or not str(name).strip():
        return None
    
    name = ' '.join(str(name).split())
    if len(name) > 50:
        name = name[:47] + "..."
    
    description = api_data.get('description') or api_data.get('generic_name') or api_data.get('brands')
    if not description or not str(description).strip():
        return None
    
    description = ' '.join(str(description).split())
    if len(description) > 255:
        description = description[:252] + "..."
    
    try:
        price = float(api_data.get('price', 0))
    except (ValueError, TypeError):
        price = 0
    
    if price <= 0:
        price = round(random.uniform(10, 200), 2)
    else:
        price = round(price, 2)
    
    category = api_data.get('category', '')
    if isinstance(category, dict):
        category = category.get('name', '')
    
    if not category:
        if source == 'openbeautyfacts':
            category = 'beauty'
        else:
            category = 'general'
    
    category = str(category).lower()
    
    image = api_data.get('image') or api_data.get('image_url')
    
    if not image:
        images = api_data.get('images', {})
        if isinstance(images, dict):
            for key in ['front', 'front_en', 'front_fr', 'selected_images', 'small']:
                if key in images and images[key]:
                    img_val = images[key]
                    if isinstance(img_val, dict):
                        img_val = img_val.get('url') or img_val.get('display') or img_val.get('small')
                    if img_val:
                        image = img_val
                        break
        
        elif isinstance(images, list) and len(images) > 0:
            image = images[0]
    
    if not image or not isinstance(image, str):
        return None
    
    return {
        'name': name,
        'description': description,
        'price': price,
        'image': image,
        'category': category,
        'source': source,
        'from_api': True
    }

def fetch_escuelajs(session, offset, limit):
    products = []
    try:
        url = f'https://api.escuelajs.co/api/v1/products?offset={offset}&limit={limit}'
        response = session.get(url, timeout=8)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                for item in data:
                    normalized = normalize_product(item, 'escuelajs')
                    if normalized:
                        products.append(normalized)
    except Exception:
        pass
    return products

def fetch_dummyjson(session, skip, limit):
    products = []
    try:
        url = f'https://dummyjson.com/products?limit={limit}&skip={skip}'
        response = session.get(url, timeout=8)
        if response.status_code == 200:
            data = response.json()
            for item in data.get('products', []):
                normalized = normalize_product(item, 'dummyjson')
                if normalized:
                    products.append(normalized)
    except Exception:
        pass
    return products

def fetch_fakestore(session):
    products = []
    try:
        response = session.get('https://fakestoreapi.com/products', timeout=8)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                for item in data:
                    normalized = normalize_product(item, 'fakestore')
                    if normalized:
                        products.append(normalized)
    except Exception:
        pass
    return products

def fetch_openbeautyfacts(session, page):
    products = []
    try:
        url = f'https://world.openbeautyfacts.org/api/v2/search?fields=product_name,generic_name,brands,image_url,images&page_size=100&page={page}'
        response = session.get(url, timeout=8)
        if response.status_code == 200:
            data = response.json()
            for item in data.get('products', []):
                normalized = normalize_product(item, 'openbeautyfacts')
                if normalized:
                    products.append(normalized)
    except Exception:
        pass
    return products

def validate_images_batch(products, max_workers=24):
    def validate_one(product):
        image_url = product.get('image')
        if image_url and is_good_image(image_url):
            return product
        return None
    
    validated = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(validate_one, p) for p in products]
        for future in as_completed(futures):
            result = future.result()
            if result:
                validated.append(result)
    
    return validated

def seed_products():
    random.seed(42)
    today = date.today()
    target_count = 1000
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (compatible; ProductSeeder/1.0)'
    })
    
    all_products = []
    seen_name_slugs = set()
    seen_image_urls = set()
    food_count = 0
    source_counts = {"escuelajs": 0, "dummyjson": 0, "fakestore": 0, "openbeautyfacts": 0}
    
    offset = 0
    limit = 100
    while len(all_products) < target_count and source_counts["escuelajs"] < PER_SOURCE_SOFT_CAP["escuelajs"]:
        batch = fetch_escuelajs(session, offset, limit)
        if not batch:
            break
        
        for product in batch:
            if source_counts["escuelajs"] >= PER_SOURCE_SOFT_CAP["escuelajs"]:
                break
            
            name_slug = slug(product['name'])
            image_url = product.get('image', '')
            
            if name_slug in seen_name_slugs or image_url in seen_image_urls:
                continue
            
            is_food = looks_like_food(product['name'], product['description'], product['category'])
            if is_food:
                if (food_count + 1) / (len(all_products) + 1) > MAX_FOOD_RATIO:
                    continue
            else:
                if not category_is_allowed(product['category']):
                    continue
            
            all_products.append(product)
            seen_name_slugs.add(name_slug)
            seen_image_urls.add(image_url)
            source_counts["escuelajs"] += 1
            if is_food:
                food_count += 1
            
            if len(all_products) >= target_count:
                break
        
        offset += limit
        if offset > 10000:
            break
    
    if len(all_products) < target_count:
        skip = 0
        limit = 100
        while len(all_products) < target_count and source_counts["dummyjson"] < PER_SOURCE_SOFT_CAP["dummyjson"]:
            batch = fetch_dummyjson(session, skip, limit)
            if not batch:
                break
            
            for product in batch:
                if source_counts["dummyjson"] >= PER_SOURCE_SOFT_CAP["dummyjson"]:
                    break
                
                if len(all_products) >= target_count:
                    break
                
                name_slug = slug(product['name'])
                image_url = product.get('image', '')
                
                if name_slug in seen_name_slugs or image_url in seen_image_urls:
                    continue
                
                is_food = looks_like_food(product['name'], product['description'], product['category'])
                if is_food:
                    if (food_count + 1) / (len(all_products) + 1) > MAX_FOOD_RATIO:
                        continue
                else:
                    if not category_is_allowed(product['category']):
                        continue
                
                all_products.append(product)
                seen_name_slugs.add(name_slug)
                seen_image_urls.add(image_url)
                source_counts["dummyjson"] += 1
                if is_food:
                    food_count += 1
            
            skip += limit
            if skip > 10000:
                break
    
    if len(all_products) < target_count:
        batch = fetch_fakestore(session)
        for product in batch:
            if source_counts["fakestore"] >= PER_SOURCE_SOFT_CAP["fakestore"]:
                break
            
            if len(all_products) >= target_count:
                break
            
            name_slug = slug(product['name'])
            image_url = product.get('image', '')
            
            if name_slug in seen_name_slugs or image_url in seen_image_urls:
                continue
            
            is_food = looks_like_food(product['name'], product['description'], product['category'])
            if is_food:
                if (food_count + 1) / (len(all_products) + 1) > MAX_FOOD_RATIO:
                    continue
            else:
                if not category_is_allowed(product['category']):
                    continue
            
            all_products.append(product)
            seen_name_slugs.add(name_slug)
            seen_image_urls.add(image_url)
            source_counts["fakestore"] += 1
            if is_food:
                food_count += 1
    
    if len(all_products) < target_count:
        page = 1
        while len(all_products) < target_count and source_counts["openbeautyfacts"] < PER_SOURCE_SOFT_CAP["openbeautyfacts"]:
            batch = fetch_openbeautyfacts(session, page)
            if not batch or len(batch) < 10:
                break
            
            for product in batch:
                if source_counts["openbeautyfacts"] >= PER_SOURCE_SOFT_CAP["openbeautyfacts"]:
                    break
                
                if len(all_products) >= target_count:
                    break
                
                name_slug = slug(product['name'])
                image_url = product.get('image', '')
                
                if name_slug in seen_name_slugs or image_url in seen_image_urls:
                    continue
                
                is_food = looks_like_food(product['name'], product['description'], product['category'])
                if is_food:
                    if (food_count + 1) / (len(all_products) + 1) > MAX_FOOD_RATIO:
                        continue
                else:
                    if not category_is_allowed(product['category']) and product['source'] != 'openbeautyfacts':
                        continue
                
                all_products.append(product)
                seen_name_slugs.add(name_slug)
                seen_image_urls.add(image_url)
                source_counts["openbeautyfacts"] += 1
                if is_food:
                    food_count += 1
            
            page += 1
            if page > 100:
                break
    
    all_products = validate_images_batch(all_products)
    
    if len(all_products) > target_count:
        all_products = all_products[:target_count]
    
    seen_name_slugs = set()
    seen_image_urls = set()
    final_products = []
    final_food_count = 0
    
    for product in all_products:
        name_slug = slug(product['name'])
        image_url = product.get('image', '')
        
        if name_slug in seen_name_slugs or image_url in seen_image_urls:
            continue
        
        final_products.append(product)
        seen_name_slugs.add(name_slug)
        seen_image_urls.add(image_url)
        if looks_like_food(product['name'], product['description'], product['category']):
            final_food_count += 1
    
    all_products = final_products
    
    final_count = len(all_products)
    assert 0 < final_count <= target_count, f"Expected 0 < count <= {target_count}, got {final_count}"
    
    final_name_slugs = {slug(p['name']) for p in all_products}
    assert len(final_name_slugs) == final_count, f"Name slugs not unique: {len(final_name_slugs)} unique, {final_count} total"
    
    final_image_urls = {p['image'] for p in all_products}
    assert len(final_image_urls) == final_count, f"Image URLs not unique: {len(final_image_urls)} unique, {final_count} total"
    
    assert all(p.get('image') for p in all_products), "Some products have empty images"
    assert all(p.get('from_api') for p in all_products), "Some products have synthesized titles/descriptions"
    
    food_ratio = final_food_count / max(1, final_count)
    assert food_ratio <= MAX_FOOD_RATIO + 0.01, f"Food ratio {food_ratio:.2%} exceeds cap"
    
    user_ids = list(range(1, 122))
    products = []
    
    for prod_data in all_products:
        days_ago = random.randint(1, 365)
        create_date = today - timedelta(days=days_ago)
        update_date = create_date + timedelta(days=random.randint(0, 30))
        if update_date > today:
            update_date = today
        
        owner_id = random.choice(user_ids)
        
        product = Product(
            name=prod_data['name'],
            description=prod_data['description'],
            image=prod_data['image'],
            price=prod_data['price'],
            create_at=datetime.combine(create_date, datetime.min.time()),
            update_at=datetime.combine(update_date, datetime.min.time()),
            owner_id=owner_id
        )
        products.append(product)
    
    random.shuffle(products)
    
    batch_size = 100
    for i in range(0, len(products), batch_size):
        batch = products[i:i + batch_size]
        for product in batch:
            db.session.add(product)
        db.session.commit()
    
    print(f"Seeded {len(products)} products (food ratio: {food_ratio:.2%})")

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
