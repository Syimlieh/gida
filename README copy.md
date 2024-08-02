Overview
Gida API is a backend application designed to manage user authentication, product listings, and shopping cart functionalities. The project follows the MVC architecture and uses Nest.js for the backend, PostgreSQL with prisma as the database, and integrate with Redis.


Technology used:
    - Nest.js
    - PostgreSQL
    - Prisma
    - Redis

For Testing API's, swagger UI is added.
    - /swagger

OTP Signin Request
    Endpoint: /api/auth/login/request

Verify OTP
    Endpoint: /api/auth/login/verify

Add Items to Cart (Not linked with product schema)
    Endpoint: /api/cart 

Update Items Quantity in Cart
    Endpoint: /api/cart/{product}

Delete Items from Cart
    Endpoint: /api/cart/{product}

Add Products in Bulk
    Endpoint: /api/product/bulk

List Products
    Endpoint: /api/product