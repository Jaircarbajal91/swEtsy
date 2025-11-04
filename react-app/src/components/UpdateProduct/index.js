import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { editProductThunk, getProductsThunk } from "../../store/products";
import './UpdateProduct.css'

const UpdateProduct = ({ setShowUpdate, product }) => {
const dispatch = useDispatch();
const history = useHistory();
const id = product?.id;
const sessionUser = useSelector(state => state.session.user);
const [name, setName] = useState(product?.name || '');
const [description, setDescription] = useState(product?.description || '');
const [image, setImage] = useState(product?.image || '');
const [price, setPrice] = useState(product?.price || 0);
const [errors, setErrors] = useState([]);
const [hasSubmitted, setHasSubmitted] = useState(false);

useEffect(() => {
    const newErrors = [];
    const nameValue = name || '';
    const descriptionValue = description || '';
    const imageValue = image || '';
    const priceValue = price || 0;
    
    if (!nameValue.length) {
        newErrors.push('Please give your product a name');
    } else if (nameValue.length > 40 || nameValue.length < 3) {
        newErrors.push('Name must be between 3 and 40 characters');
    }
    
    if (!descriptionValue.length) {
        newErrors.push('Please describe your product!');
    } else if (descriptionValue.length > 200 || descriptionValue.length < 1) {
        newErrors.push('Description must between 1 and 200 characters');
    }
    
    if (!imageValue.length) {
        newErrors.push('Please enter an image URL');
    } else {
        const regex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;
        if (!imageValue.match(regex)) {
            newErrors.push('Please enter a valid image address');
            newErrors.push('E.g. "https://example.com/image.jpg"');
        }
        if (imageValue.length > 250) {
            newErrors.push('Image link cannot go over than 250 characters.');
        }
    }
    
    const priceNum = parseFloat(priceValue);
    if (isNaN(priceNum) || priceNum <= 0 || priceNum > 1000000) {
        newErrors.push('Please enter a valid price');
    } else {
        const priceStr = priceNum.toString();
        if (!priceStr.match(/^\d+(?:\.\d{1,2})?$/)) {
            newErrors.push('Please enter a valid price');
        }
    }
    
    setErrors(newErrors);
}, [name, description, image, price]);

const handleSubmit = async e => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!id) {
        console.error('Product ID is missing');
        return;
    }

    const payload = {
        id,
        name: name || '',
        description: description || '',
        image: image || '',
        price: parseFloat(price) || 0,
    }

    await dispatch(editProductThunk(payload));
    await dispatch(getProductsThunk());
    history.push(`/products/${id}`);
    setShowUpdate(false);
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

return (
    <form onSubmit={handleSubmit} className="update-product-form">
        <div className="update-product-container">
            {/* Header */}
            <div className="update-product-header">
                <div className="header-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </div>
                <h2 className="edit-title">Edit Your Listing</h2>
                <p className="edit-subtitle">Update your product details below</p>
            </div>

            {/* Error Messages */}
            {errors && Array.isArray(errors) && errors.length > 0 && (
                <div className="form-errors-container">
                    <ul className="errors-list">
                        {errors.map((error, idx) => (
                            <li key={idx} className="error-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                <span>{error}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Main Content */}
            <div className="update-product-content">
                {/* Left Side - Image Preview */}
                <div className="preview-section">
                    <div className="preview-card">
                        <div className="preview-label">Image Preview</div>
                        <div className="image-preview-container">
                            <img 
                                src={image || product?.image || ''} 
                                alt={name || "Product preview"} 
                                className="image-preview"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x400?text=Invalid+Image+URL';
                                }}
                            />
                        </div>
                        <div className="preview-info">
                            <div className="preview-name">{name || "Product Name"}</div>
                            <div className="preview-price">
                                {price && !isNaN(parseFloat(price)) 
                                    ? formatter.format(parseFloat(price)) 
                                    : '$0.00'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Fields */}
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="name-input" className="form-label">
                            <span className="label-text">Product Name</span>
                            <span className="label-count">{(name || '').length}/40</span>
                        </label>
                        <input
                            id="name-input"
                            className="input-field"
                            type='text'
                            value={name || ''}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter product name"
                            maxLength={40}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description-input" className="form-label">
                            <span className="label-text">Description</span>
                            <span className="label-count">{(description || '').length}/200</span>
                        </label>
                        <textarea
                            id="description-input"
                            className="input-field textarea-field"
                            value={description || ''}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Describe your product..."
                            maxLength={200}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image-input" className="form-label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input
                            id="image-input"
                            className="input-field"
                            type='url'
                            value={image || ''}
                            onChange={e => setImage(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                        <div className="input-hint">URL must end with .jpg, .jpeg, .png, or .gif</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price-input" className="form-label">
                            <span className="label-text">Price</span>
                        </label>
                        <div className="price-input-wrapper">
                            <span className="price-symbol">$</span>
                            <input
                                id="price-input"
                                className="input-field price-field"
                                type='number'
                                min='0'
                                max='1000000'
                                step='.01'
                                pattern="^\d+(?:\.\d{1,2})?$"
                                value={price || ''}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button"
                            onClick={() => setShowUpdate(false)}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                        <button 
                            type='submit' 
                            disabled={errors && errors.length > 0} 
                            className="submit-button"
                        >
                            <span>Save Changes</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
)
}

export default UpdateProduct
