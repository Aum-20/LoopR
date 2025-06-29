# 🔧 Financial Dashboard Backend

A robust Node.js + Express backend API built with TypeScript and MongoDB. Handles user authentication, transaction management, and secure API operations for the Penta Financial Dashboard.

---

## 🚀 Features

* 🔐 **JWT Authentication**: Signup/Login with secure token handling
* 📊 **Transaction Management**: CRUD operations on user transactions
* 👤 **User Profile Management**: View and update user data
* ⚙️ **Security Middleware**: Helmet, CORS, rate limiting
* 📁 **File Uploads**: CSV import/export for transactions (extensible)
* 🧱 **MongoDB + Mongoose**: Schema-driven NoSQL database
* 🔁 **TypeScript Support**: Full typings and dev ergonomics

---

## 📋 Requirements

* Node.js (v14 or higher)
* MongoDB (local or Atlas)
* npm / yarn

---

## 🛠️ Installation

```bash
git clone <repo-url>
cd LOOPR-Backend
npm install
```

Create a `.env` file in the root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/financial-dashboard
JWT_SECRET=your-super-secret-key
FRONTEND_URL=http://localhost:5173
```

---

## 🔄 Scripts

```bash
npm run dev       # Start dev server with nodemon
npm run build     # Compile TypeScript to JS
npm start         # Run production server from dist/
```

---

## 📚 API Endpoints

### 🔐 Auth (`/api/auth`)

* `POST /signup` - Register a new user
* `POST /login` - Authenticate user and get token
* `GET /profile` - Get authenticated user data
* `PUT /profile` - Update user info

### 📈 Transactions (`/api/transactions`)

* `GET /` - List all user transactions
* `POST /` - Add a new transaction
* `GET /:id` - Get single transaction
* `PUT /:id` - Update transaction
* `DELETE /:id` - Remove transaction

### 🧑‍💻 Users (`/api/users`)

* (Admin access) Manage user accounts

### 🔁 Health

* `GET /api/health` - Health check

---

## 📂 Project Structure

```
src/
├── controllers/          # Auth, transaction, user logic
├── routes/               # Express routers
├── models/               # Mongoose models
├── middleware/           # Auth middleware, error handling
├── utils/                # Helper utilities
├── index.ts              # Main entry point
└── config/               # DB & env setup
```

---

## 🔒 Security

* **Helmet**: Adds HTTP headers
* **CORS**: Cross-Origin Resource Sharing config
* **Rate Limiting**: Prevent brute force
* **Mongoose Validation**: Input safety
* **bcryptjs**: Password hashing

---

## 🧪 Testing

```bash
npm test
```

> Test suite placeholder; can be extended with Jest or Supertest.

---

## 🌍 Environment Variables

| Key            | Description                      | Default                                        |
| -------------- | -------------------------------- | ---------------------------------------------- |
| `PORT`         | Backend port                     | 5000                                           |
| `MONGODB_URI`  | MongoDB connection string        | mongodb://localhost:27017/...                  |
| `JWT_SECRET`   | JWT token signing key            | required                                       |
| `FRONTEND_URL` | Whitelisted CORS frontend domain | [http://localhost:5173](http://localhost:5173) |

---

## ✅ Assignment Coverage

* ✔️ Signup/Login flow
* ✔️ Secure routes with JWT
* ✔️ MongoDB-backed transaction system
* ✔️ CORS + Rate limiting
* ✔️ JSON + CSV ready architecture

---

Built with ❤️ using Express, TypeScript, and MongoDB.
