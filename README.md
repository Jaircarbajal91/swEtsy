#  `Etsy` Clone: `swEtsy`

swEtsy is a web application for practicing web developent. It is inspired by Etsy.
It mimics an online marketing platform, for people to listing their product and buy products sold by others.

### How to launch the full site:
[swEtsy](https://swetsy-app.herokuapp.com/)

## Useful Links:
[Wiki of this Project](https://github.com/Jaircarbajal91/swEtsy/wiki)

[DB Schema](https://github.com/Jaircarbajal91/swEtsy/wiki/DB-Schema)

[User Stories](https://github.com/Jaircarbajal91/swEtsy/wiki/User-Stories)

[Feature List](https://github.com/Jaircarbajal91/swEtsy/wiki/Feature-List)

[Backend API Routes](https://github.com/Jaircarbajal91/swEtsy/wiki/Backend-API-Routes)

[Frontend API Routes](https://github.com/Jaircarbajal91/swEtsy/wiki/Frontend-Routes)

[Redux Store Shape](https://github.com/Jaircarbajal91/swEtsy/wiki/Redux-Store-Shape)

## The project is built with
* Python
* Flask
* WTForms
* SQLAlchemy
* SQLite
* PostgreSQL
* React
* Redux
* Redux-thunk
* Docker
* Heroku


## Features Directions:

### Index Page

You don't have to log in at this page.
For demo user, you can click the login, and click demo user.

IMPORTANT: You can click the icon to go back to this index page at any other pages.

![demoLogin&Login](./feature_screenshots/demologin.JPG)
![register](./feature_screenshots/register.JPG)

The route for main page is '/'.

![indexPage](./feature_screenshots/mainpage.JPG)

The logged in user could see the profile menu from the navbar.

![profileMenu](./feature_screenshots/profileMenu.JPG)

### Product Detail
You can see product detail by clicking a product card in main page or search page, no matter logged in or not.

![productDetailNotLogged](./feature_screenshots/productDetailNotLogged.JPG)

Operations like adding to cart and adding review requires the user logged in.

![productDetailDoLogged](./feature_screenshots/productDetailDoLogged.JPG)

The owner who listed the product can see the edit button of the product.

![productDetailOwner](./feature_screenshots/productDetailOwner.JPG)

### Listing a new product
The user can click the "List A New Product" button in the profile menu, then it will be the page for creating a new product.
It's a multi page form:

![newProductPageOne](./feature_screenshots/newProductPageOne.JPG)
![newProductPageTwo](./feature_screenshots/newProductPageTwo.JPG)
![newProductPageThree](./feature_screenshots/newProductPageThree.JPG)
![newProductPageFour](./feature_screenshots/newProductPageFour.JPG)

Click "back" to go to the previous page, or click "next" to go to the next page. In the final page, click "List Product" to go to the detail page of the product.

### Product Edit and Delete
The owner can edit the product by clicking Edit, then the product edit panel will be shown.

![updateProductModal](./feature_screenshots/updateProductModal.png)

The owner can delete the product by clicking Delete.

### Review
The user can see the review score in search page, and the review details of the product in the product's detail page.

![productReview](./feature_screenshots/productReview.JPG)

The user can see its all review by clicking "See Your Reviews" in the profile menu.

![editYourReviews](./feature_screenshots/editYourReviews.JPG)

### Edit or Delete Review
The user can edit a review by clicking "EDIT YOUR REVIEW" in myrevies page. Then the window for editing a review will show up. The user can edit the current review, then update it by clicking "Update My Review". The user can clear the whole review by clicking "Clear". If the user wants to delete the review, it can just click the "Delete" button.

![editReviewWindow](./feature_screenshots/editReviewWindow.JPG)


### Search Page
You don't have to log in to see this page.
An empty keyword will show you all the products.

![searchAll](./feature_screenshots/searchAll.JPG)

Or search with a keyword.

![searchKey](./feature_screenshots/searchKey.JPG)

Also there are price filters the user can choose to target its dream products:

![filterButton](./feature_screenshots/filterButton.JPG)
![filter](./feature_screenshots/filter.JPG)

And the sorting rule for the user to change the order of products:

![sorting](./feature_screenshots/sorting.JPG)

### Cart Page

Must be logged to see cart page. Shows all cart items with options to increase quantity and remove item from cart

![cart](./feature_screenshots/cart.png)

Clicking proceed with purchase will remove all items from cart.

![purchase-cart](./feature_screenshots/purchaseCart.png)
