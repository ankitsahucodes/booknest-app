# BookNest
A full-stack e-commerce books app that allows users to browse, filter, and search books, view details, manage cart and wishlist, handle addresses, and place orders.

Build with React Frontend, Express/Node backend, MongoDB database and React Router.

---
## Demo Link

[Live Demo](https://booknest-web-app.vercel.app)

---

##  Quick Start

```
git clone https://github.com/ankitsahucodes/booknest-app.git
cd booknest-app
npm install
npm run dev
```

## Environment Setup
Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```
### Required Keys:<br>
PORT – Port on which the server runs<br>
MONGODB_URI – MongoDB connection string

## Technologies
- React JS
- React Router
- Node.js
- Express
- MongoDB

---

## Demo Video

Watch a 5-minute walkthrough of all major features:<br>
[Watch Demo](https://drive.google.com/file/d/1dOlxiyp6P3qkEtnUaPWRa4bz8s9lQMBY/view?usp=sharing)

---

## Features
**Home**
- Displays books categories to browse from
- Real-time search books by title or author


**Books**

- Filter panel with Rating slider and Category-based filters
- Sort books by price
- Search bar to find books by title or author
- View all books.
- Add to Cart and Add to Wishlist options
- Click on a book to view its detailed page

**Book Details**
- View detailed information of a selected book
- Add to Cart and Add to Wishlist options

**Wishlist**
- View all books added to the wishlist
- Add to cart
- Remove from wishlist

**Cart**
- View all books added to the cart
- Update item quantity or remove items
- Cart summary
- Checkout to place orders

**Checkout**
- Selected delivery address
- Manage addresses
- Order summary with items, quantity, and price
- Place order Button

**User Profile**
- View user details
- Manage delivery addresses
- View order history
---
## API Reference
### **Books**
### GET /api/books
List all books<br>
Sample Response:
```json
[
  {
    "_id": "bookId",
    "title": "Book Title",
    "author": "Author Name",...
  },...
]
```
### GET /books/:bookId

Get details of a single book<br>
Sample Response:
```json
{
  "_id": "bookId",
  "title": "Book Title",
  "author": "Author Name",
  ...
}
```

### GET /books/category/:bookCategory

Get books by category<br>
Sample Response:
```json
[
  { "_id": "bookId", "title": "Book Title", "category": "Fiction" },...
]
```

### POST /books

Add a new book<br>
Sample Response:
```json
{
  "message": "Book added successfully",
  "book": { "_id": "bookId", "title": "Book Title",... }
}
```
### **User Profile**
### GET /profile/:userId

Get user profile<br>
Sample Response:

```json
{
  "_id": "userId",
  "email": "user@email.com",
  "wishlist": [],
  "addresses": {
    "houseNumber": "123",
    ...
  },
  ...
}
```
### **Wishlist**
### GET /wishlist/:userId

Get wishlist items<br>
Sample Response:
```json
["bookId1", "bookId2"]
```

### POST /wishlist/:userId

Add book to wishlist<br>
Sample Response:

```json
["bookId1", "bookId2",...]
```

### DELETE /wishlist/:userId

Remove book from wishlist<br>
Sample Response:
```json
["bookId2"],...
```
### **Cart**
### GET /cart/:userId

Get cart items<br>
Sample Response:
```json
[
  { "bookId": "bookId", "quantity": 2 }
]
```

### POST /cart/:userId

Add or update cart item<br>
Sample Response:
```json
[
  { "bookId": "bookId", "quantity": 3 }
]
```

### DELETE /cart/:userId

Remove item from cart<br>
Sample Response:
```json
[]
```
### **Address**
### GET /address/:userId

Get all addresses<br>
Sample Response:
```json
[
  { "_id": "addressId", "city": "Raipur", "country": "India" }
]
```

### POST /address/:userId

Add a new address<br>
Sample Response:
```json
[
  { "_id": "addressId", "city": "Raipur", "country": "India" }
]
```
### POST /address/update/:userId/:addressId

Update an address<br>
Sample Response:
```json
[
  { "_id": "addressId", "city": "Bhilai",... }
]
```

### DELETE /address/:userId/:addressId

Delete an address<br>
Sample Response:
```json
[]
```

### **Orders**
### POST /order-placed/:userId

Place an order<br>
Sample Response:
```json
[
  {
    "orderId": "orderId",
    "items": [],
    "totalAmount": 999
  }
]
```
## Contact

For bugs or feature requests, please reach out to ankitsahu2829@gmail.com
