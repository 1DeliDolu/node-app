# 🛒 Node Shop

A full-stack e-commerce web application built with **Express.js**, **MongoDB**, and **Pug** — powered by **Bun** runtime.

---

## ✨ Features

- 🔐 User authentication — register, login, logout
- 🔑 Password reset via email (MailHog in development)
- 🛍️ Product listing with category filtering
- 🛒 Shopping cart — add, remove, update items
- 📦 Order management
- 🛠️ Admin panel — manage products & categories
- 📁 Image upload with Multer
- 🔒 CSRF protection on all forms
- 🌱 Database seed script with demo data

---

## 🧱 Tech Stack

| Layer           | Technology                  |
| --------------- | --------------------------- |
| Runtime         | [Bun](https://bun.sh) v1.3+ |
| Framework       | Express.js 4                |
| Database        | MongoDB 8.0 LTS (Docker)    |
| ODM             | Mongoose 7                  |
| Template Engine | Pug                         |
| Session Store   | connect-mongodb-session     |
| Authentication  | bcryptjs + express-session  |
| Email           | Nodemailer + MailHog (dev)  |
| File Upload     | Multer                      |
| Security        | csurf, dotenv               |

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) `v1.3+`
- [Docker](https://www.docker.com) & Docker Compose

### 1. Clone & Install

```bash
git clone https://github.com/1DeliDolu/node-app.git
cd node-app
bun install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# MongoDB (Docker)
MONGODB_URI=mongodb://localhost:27017/node-app

# Session
SESSION_SECRET=your-strong-secret-here

# Mail — MailHog (Docker SMTP)
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_FROM=noreply@node-app.local
```

### 3. Start Docker Services

```bash
docker compose up -d
```

This starts:

- **MongoDB 8.0 LTS** → `localhost:27017`
- **MailHog** → SMTP `localhost:1025` · Web UI `http://localhost:8025`

### 4. Seed Demo Data

```bash
bun run seed
```

Creates 5 demo products, 5 categories, and an admin account:

| Field    | Value            |
| -------- | ---------------- |
| Email    | `admin@demo.com` |
| Password | `Admin1234!`     |

### 5. Run

```bash
bun start
```

App will be available at **http://localhost:3000**

---

## 📁 Project Structure

```
node-app/
├── app.js                  # Entry point
├── seed.js                 # Database seeder
├── docker-compose.yml      # MongoDB + MailHog
├── .env.example            # Environment variable template
│
├── controllers/            # Route handlers
│   ├── shop.js             # Products, cart, orders
│   ├── admin.js            # Admin CRUD
│   ├── account.js          # Auth & password reset
│   └── errors.js           # 404 / 500 handlers
│
├── models/                 # Mongoose schemas
│   ├── user.js
│   ├── product.js
│   ├── category.js
│   ├── order.js
│   └── login.js
│
├── routes/                 # Express routers
│   ├── shop.js
│   ├── admin.js
│   └── account.js
│
├── middleware/
│   ├── authentication.js   # Session auth guard
│   ├── isAdmin.js          # Admin role guard
│   └── locals.js           # CSRF token + session locals
│
├── views/                  # Pug templates
│   ├── shop/               # Index, products, cart, orders
│   ├── admin/              # Product & category management
│   ├── account/            # Login, register, reset
│   ├── layouts/
│   ├── mixins/
│   └── includes/
│
└── public/                 # Static assets
    ├── css/
    ├── js/
    └── img/
```

---

## 🔗 Routes

### Shop (Public)

| Method | Path              | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | `/`               | Home / featured products |
| GET    | `/products`       | All products             |
| GET    | `/products/:id`   | Product detail           |
| GET    | `/categories/:id` | Products by category     |

### Cart & Orders (Auth required)

| Method | Path               | Description      |
| ------ | ------------------ | ---------------- |
| GET    | `/cart`            | View cart        |
| POST   | `/cart`            | Add to cart      |
| POST   | `/delete-cartitem` | Remove from cart |
| GET    | `/orders`          | Order history    |
| POST   | `/create-order`    | Place order      |

### Account

| Method   | Path                     | Description            |
| -------- | ------------------------ | ---------------------- |
| GET/POST | `/login`                 | Login                  |
| GET/POST | `/register`              | Register               |
| GET/POST | `/reset-password`        | Request password reset |
| GET/POST | `/reset-password/:token` | Set new password       |

### Admin (Admin role required)

| Method   | Path                    | Description       |
| -------- | ----------------------- | ----------------- |
| GET      | `/admin/products`       | List own products |
| GET/POST | `/admin/add-product`    | Create product    |
| GET/POST | `/admin/products/:id`   | Edit product      |
| POST     | `/admin/delete-product` | Delete product    |
| GET/POST | `/admin/add-category`   | Create category   |
| GET      | `/admin/categories`     | List categories   |
| GET/POST | `/admin/categories/:id` | Edit category     |

---

## 📧 Email in Development

All outgoing emails are caught by **MailHog** — no real emails are sent.

Open **http://localhost:8025** to view the inbox.

---

## 📜 Scripts

```bash
bun start        # Start with hot reload
bun run seed     # Seed database with demo data
bun test         # Run tests
```

---

## 🐳 Docker

```bash
docker compose up -d      # Start services
docker compose down       # Stop services
docker compose logs -f    # Stream logs
```

---

## 🔑 Security

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- **CSRF tokens** on every POST form
- **Session-based auth** with MongoDB store
- Environment secrets via **dotenv** — never committed
- `.env` is listed in `.gitignore`

---

## 📄 License

ISC
