# Postman Testing Guide

## 🚀 Setup Instructions

### 1. Start Your Services

**Option A: Using Docker Compose (Recommended)**
```bash
docker-compose up --build
```

**Option B: Run Services Locally**
```bash
# Terminal 1 - User Service
cd user-service
npm start

# Terminal 2 - Product Service
cd product-service
npm start

# Terminal 3 - Order Service
cd order-service
npm start
```

### 2. Verify Services Are Running

Check health endpoints:
- User Service: http://localhost:3001/
- Product Service: http://localhost:3002/
- Order Service: http://localhost:3003/

---

## 📋 Test Scenarios

### **Service 1: User Service (Port 3001)**

#### Test 1.1: Health Check
- **Method:** GET
- **URL:** `http://localhost:3001/`
- **Expected Response:** `User Service OK`

#### Test 1.2: Create User
- **Method:** POST
- **URL:** `http://localhost:3001/users`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```
- **Expected Response:** 
  - Status: `201 Created`
  - Body: User object with `_id`, `name`, `email`
- **Save the `_id` for later tests!**

#### Test 1.3: Create Another User
- **Method:** POST
- **URL:** `http://localhost:3001/users`
- **Body (JSON):**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```
- **Save this `_id` too!**

#### Test 1.4: Get User by ID
- **Method:** GET
- **URL:** `http://localhost:3001/users/{userId}`
  - Replace `{userId}` with the `_id` from Test 1.2
- **Expected Response:**
  - Status: `200 OK`
  - Body: User object

#### Test 1.5: Get Non-Existent User (Error Test)
- **Method:** GET
- **URL:** `http://localhost:3001/users/507f1f77bcf86cd799439011`
- **Expected Response:**
  - Status: `404 Not Found`
  - Body: `{"error": "User not found"}`

#### Test 1.6: Create User with Duplicate Email (Error Test)
- **Method:** POST
- **URL:** `http://localhost:3001/users`
- **Body (JSON):**
```json
{
  "name": "Duplicate User",
  "email": "john.doe@example.com"
}
```
- **Expected Response:**
  - Status: `400 Bad Request`
  - Body: `{"error": "Email already exists"}`

---

### **Service 2: Product Service (Port 3002)**

#### Test 2.1: Health Check
- **Method:** GET
- **URL:** `http://localhost:3002/`
- **Expected Response:** `Product Service OK`

#### Test 2.2: Create Product
- **Method:** POST
- **URL:** `http://localhost:3002/products`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "name": "Aesthetic Phone Case",
  "price": 29.99,
  "category": "aesthetic",
  "description": "Beautiful minimalist design with floral patterns"
}
```
- **Expected Response:**
  - Status: `201 Created`
  - Body: Product object with `_id`
- **Save the `_id` for later tests!**

#### Test 2.3: Create More Products (Different Categories)
- **Method:** POST
- **URL:** `http://localhost:3002/products`
- **Body (JSON):**
```json
{
  "name": "Trendy Phone Case",
  "price": 24.99,
  "category": "trendy",
  "description": "Latest fashion trends with vibrant colors"
}
```

- **Method:** POST
- **URL:** `http://localhost:3002/products`
- **Body (JSON):**
```json
{
  "name": "Minimalist Phone Case",
  "price": 19.99,
  "category": "minimalist",
  "description": "Clean and simple design"
}
```

#### Test 2.4: Get All Products
- **Method:** GET
- **URL:** `http://localhost:3002/products`
- **Expected Response:**
  - Status: `200 OK`
  - Body: Array of all products

#### Test 2.5: Filter Products by Category
- **Method:** GET
- **URL:** `http://localhost:3002/products?category=trendy`
- **Expected Response:**
  - Status: `200 OK`
  - Body: Array containing only products with `category: "trendy"`

#### Test 2.6: Filter by Another Category
- **Method:** GET
- **URL:** `http://localhost:3002/products?category=aesthetic`
- **Expected Response:**
  - Status: `200 OK`
  - Body: Array containing only aesthetic products

#### Test 2.7: Get Product by ID
- **Method:** GET
- **URL:** `http://localhost:3002/products/{productId}`
  - Replace `{productId}` with the `_id` from Test 2.2
- **Expected Response:**
  - Status: `200 OK`
  - Body: Product object

#### Test 2.8: Get Non-Existent Product (Error Test)
- **Method:** GET
- **URL:** `http://localhost:3002/products/507f1f77bcf86cd799439011`
- **Expected Response:**
  - Status: `404 Not Found`
  - Body: `{"error": "Product not found"}`

#### Test 2.9: Create Product with Invalid Category (Error Test)
- **Method:** POST
- **URL:** `http://localhost:3002/products`
- **Body (JSON):**
```json
{
  "name": "Invalid Product",
  "price": 15.99,
  "category": "invalid_category",
  "description": "This should fail"
}
```
- **Expected Response:**
  - Status: `400 Bad Request`
  - Error message about invalid category

---

### **Service 3: Order Service (Port 3003) - MOST IMPORTANT**

#### Test 3.1: Health Check
- **Method:** GET
- **URL:** `http://localhost:3003/`
- **Expected Response:** `Order Service OK`

#### Test 3.2: Create Order (Valid User & Product)
- **Method:** POST
- **URL:** `http://localhost:3003/orders`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "userId": "{userId}",
  "productId": "{productId}"
}
```
- **Replace:**
  - `{userId}` with the `_id` from User Service Test 1.2
  - `{productId}` with the `_id` from Product Service Test 2.2
- **Expected Response:**
  - Status: `201 Created`
  - Body: Order object with `userId`, `productId`, `productName`, `productPrice`, `timestamp`
- **Save the order `_id`!**

#### Test 3.3: Create Another Order
- **Method:** POST
- **URL:** `http://localhost:3003/orders`
- **Body (JSON):**
```json
{
  "userId": "{userId}",
  "productId": "{productId}"
}
```
- Use different user/product IDs

#### Test 3.4: Get Order by ID
- **Method:** GET
- **URL:** `http://localhost:3003/orders/{orderId}`
  - Replace `{orderId}` with the `_id` from Test 3.2
- **Expected Response:**
  - Status: `200 OK`
  - Body: Order object with all details

#### Test 3.5: Create Order with Invalid User (Error Test)
- **Method:** POST
- **URL:** `http://localhost:3003/orders`
- **Body (JSON):**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "productId": "{validProductId}"
}
```
- Use a valid productId but invalid userId
- **Expected Response:**
  - Status: `404 Not Found`
  - Body: `{"error": "User not found"}`

#### Test 3.6: Create Order with Invalid Product (Error Test)
- **Method:** POST
- **URL:** `http://localhost:3003/orders`
- **Body (JSON):**
```json
{
  "userId": "{validUserId}",
  "productId": "507f1f77bcf86cd799439011"
}
```
- Use a valid userId but invalid productId
- **Expected Response:**
  - Status: `404 Not Found`
  - Body: `{"error": "Product not found"}`

#### Test 3.7: Create Order with Missing Fields (Error Test)
- **Method:** POST
- **URL:** `http://localhost:3003/orders`
- **Body (JSON):**
```json
{
  "userId": "{validUserId}"
}
```
- Missing `productId`
- **Expected Response:**
  - Status: `400 Bad Request`
  - Body: `{"error": "userId and productId are required"}`

#### Test 3.8: Get Non-Existent Order (Error Test)
- **Method:** GET
- **URL:** `http://localhost:3003/orders/507f1f77bcf86cd799439011`
- **Expected Response:**
  - Status: `404 Not Found`
  - Body: `{"error": "Order not found"}`

---

## 🎯 Complete Test Flow (End-to-End)

### Step-by-Step Complete Flow:

1. **Create User 1**
   - POST `http://localhost:3001/users`
   - Body: `{"name": "Alice", "email": "alice@example.com"}`
   - Save: `userId1`

2. **Create User 2**
   - POST `http://localhost:3001/users`
   - Body: `{"name": "Bob", "email": "bob@example.com"}`
   - Save: `userId2`

3. **Create Product 1**
   - POST `http://localhost:3002/products`
   - Body: `{"name": "Cool Case", "price": 25.99, "category": "trendy", "description": "Very cool"}`
   - Save: `productId1`

4. **Create Product 2**
   - POST `http://localhost:3002/products`
   - Body: `{"name": "Nice Case", "price": 30.99, "category": "aesthetic", "description": "Very nice"}`
   - Save: `productId2`

5. **Create Order 1** (Alice buys Cool Case)
   - POST `http://localhost:3003/orders`
   - Body: `{"userId": "userId1", "productId": "productId1"}`
   - Should succeed! ✅

6. **Create Order 2** (Bob buys Nice Case)
   - POST `http://localhost:3003/orders`
   - Body: `{"userId": "userId2", "productId": "productId2"}`
   - Should succeed! ✅

7. **Verify Order 1**
   - GET `http://localhost:3003/orders/{orderId1}`
   - Should show order details ✅

8. **Test Error: Invalid Order**
   - POST `http://localhost:3003/orders`
   - Body: `{"userId": "invalid", "productId": "invalid"}`
   - Should fail with 404 ✅

---

## 📊 Postman Collection Setup

### Create a Postman Collection:

1. **Create New Collection:** "Microservices E-Commerce API"

2. **Create Folders:**
   - User Service
   - Product Service
   - Order Service

3. **Add Variables:**
   - `base_url_user`: `http://localhost:3001`
   - `base_url_product`: `http://localhost:3002`
   - `base_url_order`: `http://localhost:3003`
   - `userId`: (will be set after creating user)
   - `productId`: (will be set after creating product)
   - `orderId`: (will be set after creating order)

4. **Use Variables in URLs:**
   - `{{base_url_user}}/users`
   - `{{base_url_product}}/products`
   - `{{base_url_order}}/orders`

---

## ✅ Testing Checklist

### User Service
- [ ] Health check works
- [ ] Create user successfully
- [ ] Get user by ID
- [ ] Error: Get non-existent user
- [ ] Error: Duplicate email

### Product Service
- [ ] Health check works
- [ ] Create product successfully
- [ ] Get all products
- [ ] Filter by category
- [ ] Get product by ID
- [ ] Error: Get non-existent product
- [ ] Error: Invalid category

### Order Service
- [ ] Health check works
- [ ] Create order with valid user & product
- [ ] Get order by ID
- [ ] Error: Invalid user
- [ ] Error: Invalid product
- [ ] Error: Missing fields
- [ ] Error: Get non-existent order

### Integration Tests
- [ ] Complete end-to-end flow works
- [ ] Order service calls User service correctly
- [ ] Order service calls Product service correctly
- [ ] All services communicate properly

---

## 🐛 Troubleshooting

### Service Not Responding
- Check if service is running: `curl http://localhost:3001/`
- Check Docker containers: `docker ps`
- Check logs: `docker-compose logs`

### Connection Errors
- Verify MongoDB Atlas IP whitelist
- Check network connectivity
- Verify service ports are not blocked

### 404 Errors
- Verify IDs are correct (MongoDB ObjectIds)
- Check if resource exists in database
- Verify endpoint URLs are correct

---

## 📝 Notes

- **Save IDs**: Always save the `_id` values returned from POST requests
- **Test Order**: Test User and Product services first, then Order service
- **Error Testing**: Test both success and error scenarios
- **Docker**: If using Docker, services communicate via service names, not localhost

---

## 🎓 What This Demonstrates

✅ **Microservices Architecture**: Independent services running separately  
✅ **REST API Communication**: Services communicate via HTTP/REST  
✅ **Service-to-Service Calls**: Order service validates via User and Product services  
✅ **Error Handling**: Proper error responses for invalid requests  
✅ **Database Independence**: Each service has its own database  

Good luck with your testing! 🚀

