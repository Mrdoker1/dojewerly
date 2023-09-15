# dojewerly.com

![Thumbnail](https://user-images.githubusercontent.com/26232484/180622932-94697695-f277-480a-8d3b-e5846d02da93.jpg)

## Links:
> [Design](https://www.figma.com/file/rbLt4cru33melj0pt5EbvQ/Design-2-dojewerly.com-Shop?node-id=0%3A1)  
> 
> [Deploy](https://do-jewerly-app.herokuapp.com/)

## Roadmap

Frontend
- Stage 1 (Basic MVP)
  - ✅ **Router**
  - **Homepage**
  - **Collections**
  - ✅ **Auth**
  - ✅ **Catalog**
  - ✅ **Product Page**
  - **Adaptive**
  - **Language Switch(+Translation)**
  - ✅ **User Dashboard**
- Stage 2 (Messaging & Statistic)
  - **Messaging**
  - **Google/Yandex analytics integration**
- Stage 3 (Extended MVP #1)
  - **Admin Dashboard Statistics**
- Stage 4 (Extended MVP #2)
  - **Do X**
  - **Cart**
  - **Checkout**

Backend
- Stage 1 (MVP)
  - ✅ **Categories**
  - ✅ **Collections**
  - ✅ **Users**
  - ✅ **Authentication**
  - ✅ **Catalog**
  - ✅ **Collections**
  - ✅ **Favourites**
- Stage 2 (Extended MVP #1)
  - **Homepage and Settings**
  - **Statistics**
- Stage 3 (Extended MVP #2)
  - **Orders**
  - **Do X**
  - **Security**
    - GDPR

## API Endpoints

### Users

#### Get All Users (Admin)

- **GET** `/users`
  - Description: Get all users
  - Permissions: Admin only

#### Create New User (Admin)

- **POST** `/users`
  - Description: Create a new user with role selection
  - Permissions: Admin only

#### Get User Information (Authorized User)

- **GET** `/users/me`
  - Description: Get information about the current user's account
  - Permissions: Authorized user

#### Update User Information (Authorized User)

- **PUT** `/users/me`
  - Description: Update account information for the current user
  - Permissions: Authorized user

#### Partially Update User Information (Authorized User)

- **PATCH** `/users/me`
  - Description: Partially update account information for the current user
  - Permissions: Authorized user

#### Get User Information by ID (Admin)

- **GET** `/users/{id}`
  - Description: Get detailed information about a specific user
  - Permissions: Admin only

#### Delete User by ID (Admin)

- **DELETE** `/users/{id}`
  - Description: Delete a user by their ID
  - Permissions: Admin only

#### Update User Information by ID (Admin)

- **PUT** `/users/{id}`
  - Description: Update information about a specific user
  - Permissions: Admin only

#### Get Public User Information

- **GET** `/users/{id}/public`
  - Description: Get public information about a user, such as favorites lists

#### Register a New User (Public Registration)

- **POST** `/users/register`
  - Description: Register a new user with public registration

### Authentication

#### Login and Get JWT Token

- **POST** `/auth/login`
  - Description: Log in and receive a JWT token

#### Logout and Invalidate JWT Token

- **POST** `/auth/logout`
  - Description: Log out and invalidate the JWT token

#### Validate JWT Token

- **GET** `/auth/validate`
  - Description: Validate the JWT token

### Catalog

#### Get All Products

- **GET** `/products`
  - Description: Get all products

#### Create a New Product (Admin)

- **POST** `/products`
  - Description: Create a new product
  - Permissions: Admin only

#### Get Total Number of Products (Based on Filters)

- **GET** `/products/total`
  - Description: Get the total number of products based on filters

#### Get Product by ID

- **GET** `/products/{id}`
  - Description: Get product details by ID

#### Delete Product by ID (Admin)

- **DELETE** `/products/{id}`
  - Description: Delete a product by ID
  - Permissions: Admin only

#### Update Product by ID (Admin)

- **PUT** `/products/{id}`
  - Description: Update a product by ID
  - Permissions: Admin only

#### Partially Update Product by ID (Admin)

- **PATCH** `/products/{id}`
  - Description: Partially update a product by ID
  - Permissions: Admin only

#### Add Images to a Product (Admin)

- **PUT** `/products/{id}/images`
  - Description: Add images to a product
  - Permissions: Admin only

#### Remove Product Image (Admin)

- **DELETE** `/products/{id}/images`
  - Description: Remove a product image
  - Permissions: Admin only

#### Get All Product Images

- **GET** `/products/{id}/images`
  - Description: Get all product images

#### Update Product Images Order

- **PATCH** `/products/{id}/updateImagesOrder`
  - Description: Update the order of product images

### Collections

#### Get All Collections

- **GET** `/collections`
  - Description: Get all collections

#### Create a New Collection (Admin)

- **POST** `/collections`
  - Description: Create a new collection
  - Permissions: Admin only

#### Get Collection by ID

- **GET** `/collections/{id}`
  - Description: Get collection details by ID

#### Update Collection by ID (Admin)

- **PUT** `/collections/{id}`
  - Description: Update a collection by ID
  - Permissions: Admin only

#### Delete Collection by ID (Admin)

- **DELETE** `/collections/{id}`
  - Description: Delete a collection by ID
  - Permissions: Admin only

#### Add Product to Collection (Admin)

- **POST** `/collections/{id}/products/{productId}`
  - Description: Add a product to a collection
  - Permissions: Admin only

#### Remove Product from Collection (Admin)

- **DELETE** `/collections/{id}/products/{productId}`
  - Description: Remove a product from a collection
  - Permissions: Admin only

### Favorites

#### Get User's Favorite Products

- **GET** `/users/me/favorites/{userId}/favorites`
  - Description: Get a list of a specific user's favorite products

#### Get Current User's Favorite Products

- **GET** `/users/me/favorites`
  - Description: Get a list of the current user's favorite products

#### Add Product to Current User's Favorites

- **POST** `/users/me/favorites/{productId}`
  - Description: Add a product to the current user's favorites

#### Remove Product from Current User's Favorites

- **DELETE** `/users/me/favorites/{productId}`
  - Description: Remove a product from the current user's favorites

### Catalog Criteria

#### Get Catalog Criteria

- **GET** `/catalog-criteria`
  - Description: Get catalog criteria

#### Update Catalog Criteria

- **PUT** `/catalog-criteria`
  - Description: Update catalog criteria


