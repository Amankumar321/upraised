# IMF Gadget API

This is an Express-based API for managing spy gadgets, featuring JWT authentication, Prisma ORM, and Swagger documentation.

## 🚀 Live Demo

The API is hosted at: [https://upraised-0ski.onrender.com](https://upraised-0ski.onrender.com)

## 📑 Swagger Documentation

API docs are available at: [https://upraised-0ski.onrender.com/docs](https://upraised-0ski.onrender.com/docs)

## 📖 Features

- User authentication (signup & login) with JWT
- CRUD operations for gadgets
- Swagger API documentation
- Prisma ORM with PostgreSQL
- Secure password storage using bcrypt

## 🛠️ Setup

### 1. Clone the repository:

```sh
git clone https://github.com/Amankumar321/upraised.git
cd upraised
```

### 2. Install dependencies:

```sh
npm install
```

### 3. Set up environment variables:

Create a `.env` file and configure the following:

```env
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_secret_key
PORT=server_port
```

### 4. Run database migrations:

```sh
npx prisma migrate dev --name init
```

### 5. Start the server:

```sh
npm run dev
```

The API will be available at `http://localhost:5000`.

## 🔑 Authentication

The API uses JWT for authentication. Include a Bearer token in the `Authorization` header for protected routes.

### Signup:

```sh
POST /auth/signup
```

Body:

```json
{
  "username": "agent007",
  "password": "securepassword"
}
```

### Login:

```sh
POST /auth/login
```

Body:

```json
{
  "username": "agent007",
  "password": "securepassword"
}
```

Response:

```json
{
  "token": "your_jwt_token"
}
```

## 📜 API Endpoints

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/gadgets`                   | Retrieve all gadgets   |
| POST   | `/gadgets`                   | Create a new gadget    |
| PATCH  | `/gadgets/:id`               | Update a gadget        |
| POST   | `/gadgets/:id/decommission`  | Decommission a gadget  |
| POST   | `/gadgets/:id/self-destruct` | Self-destruct a gadget |

## 🛡️ License

This project is licensed under the MIT License.

