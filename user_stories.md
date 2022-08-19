# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## Products

### Add a Product

* As a logged in user, I want to list a product to sell.
  * When I'm on the `/new-product` page:
    * I can add and list a new product.
      * So that I can sell this product to customers on the site.

### Viewing Products

* As a logged in _or_ logged out user, I want to be able to view a selection of listed products
  * When I'm on the `/products` page:
    * I can view the most recently listed products
      * So that I can peruse the available products on the platform

* As a logged in _or_ logged out user, I want to be able to view a specific product and its associated details and reviews.
  * When I'm on the `/products/:id` page:
    * I can view the details of the product, as well as its associated reviews
      * So that I can see more information about product to better make a purchasing decision

### Updating Products

* As a logged in user, I want to be able to edit my products by clicking an Edit button associated with the product anywhere that product appears.
  * When I'm on the `/products`, `/products/:id`, or `/users/:id/products` pages:
    * I can click "Edit" to make permanent changes to products I have posted.
      * So that I can fix any errors I make in my products.

### Deleting Products

* As a logged in user, I want to be able to delete my products by clicking a Delete button associated with the product anywhere that product appears.
  * When I'm on the `/products`, `/products/:id`, or `/users/:id/products` pages:
    * I can click "Delete" to permanently delete a product I have posted.
      * So that when I no longer want to sell the product it will no longer be listed on the site

## Cart

### Add a Product to the Cart

* As a logged in user, I want to add an item to sell
  * When I'm on the `/products` page:
    * I can add a product to the cart
      * So that I can purchase this product later

### Viewing my Cart

* As a logged in user, I want to be able to view my cart
  * When I'm on the `/cart` page:
    * I can view the items I've added to my cart
      * So that I can see what I am going to purchase

### Updating my Cart

* As a logged in user, I want to be able to edit my cart by clicking an Edit button associated with the product in my cart
  * When I'm on the `/cart` page:
    * I can add or remove items from my cart
      * So that I can change my mind about the items I want to buy

### Deleting from my Cart

* As a logged in user, I want to be able to delete the items in my cart
  * When I'm on the `/cart` page
    * I can remove items from my cart
      * So that when I no longer want to buy the product it will no longer be in my shopping cart

## Reviews

### Add a Review to a Product

* As a logged in user, I want to review an item
  * When I'm on the `/products/:id` page:
    * I can add a review
      * So that I can provide feedback

### Viewing Reviews

* As a logged in user, I want to be able to view a product's reviews
  * When I'm on the `/products/:id` page:
    * I can view the reviews of a product listing
      * So that I can make an informed choice about purchasing the product

### Updating my Review

* As a logged in user, I want to be able to edit my review by clicking an Edit button associated with the review on the product page
  * When I'm on the `/products/:id` page:
    * I can update my review
      * So that I can provide updated feedback on the product

### Deleting my Review

* As a logged in user, I want to be able to delete the reviews I've posted
  * When I'm on the `/products/:id` page
    * I can delete a previously posted review
      * So that when I no longer want to give others feedback on the product or made a post in error I can remove it

## Search

### Apply searching keywords

* As a logged in _or_ logged out user, I want to be able to apply keyword searching in order to find my ideal products
  * When I'm able to see the **navigation bar**:
    * I can type keywords in the nav bar, then press enter or click on the search button
      * So that I can see all avaliable products based on my keywords on `/search` page

### Apply searching filters

* As a logged in _or_ logged out user, I want to be able to apply filter searching in order to see a product list more fits my requirement
  * When I'm on the `/search` page
    * I can click the **all filters** button, and click the filters as I want
      * So that I can see all avaliable products based on the filters I've chosen

### Apply Sorting rules

* As a logged in _or_ logged out user, I want to be able to change "sort by" rule in order that I'll find my ideal product faster, without a lot of page change and scrolling.
  * When I'm on the `/search` page
    * I can click the **Sort by** button, and click the sorting rule I need
      * So that I can see all avaliable products ordered by the property I'm caring about
