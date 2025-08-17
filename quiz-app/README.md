# Simple Quiz Application

A simple **monorepo-based Quiz Application** built with [Turborepo](https://turbo.build/), [Next.js](https://nextjs.org/), [Express](https://expressjs.com/), [Prisma](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/).  
The app allows users to **create quizzes, attempt them, and view results**.

---

## 📂 Monorepo Structure

```
|── apps
|   ├── web # Next.js frontend
|   ├── api # Express backend
|   └── docs # Documentation site
│
├── packages
│   ├── db # Prisma + Database client
│   ├── ui # Shared UI components
│   ├── typescript-config # Shared TS config
│   └── eslint-config # Shared ESLint config
│
├── turbo.json
└── package.json
```

---

## ⚡ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (apps/web)
- **Backend**: [Express](https://expressjs.com/) (apps/api)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/) (packages/db)
- **Monorepo Tooling**: [Turborepo](https://turbo.build/)
- **Package Manager**: [Bun](https://bun.sh/)

---

## 🚀 Features

- Create quizzes
- Attempt quizzes
- View results

---

## 🛠️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
```

### 2. Install dependencies

```bash
bun install
```

## Optional: Run Postgres with Docker

If you don’t have Postgres installed locally, you can run it via Docker:

```bash
docker run --name quiz-postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=quizdb -p 5432:5432 -d postgres
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/quizdb"
```

---

## 📦 Database Setup

Run Prisma migrations:

```bash
bunx prisma migrate dev
```

Open Prisma Studio (GUI for DB):

```bash
bunx prisma studio
```

---

## 🔧 Available Scripts

### Monorepo (root)

```bash
bun dev       # Run all apps in dev mode
bun build     # Build all apps/packages
bun lint      # Lint all apps/packages
```

### API (apps/api)

```bash
bun dev       # Start Express server
bun start     # Start in production mode
```

### Web (apps/web)

```bash
bun dev       # Start Next.js frontend
bun build     # Build for production
bun start     # Start Next.js in production mode
```

### DB (packages/db)

```bash
bunx prisma migrate dev   # Apply migrations
bunx prisma generate      # Generate Prisma client
bunx prisma studio        # Open Prisma Studio
```

---

## 📖 Documentation

The `apps/docs` package contains documentation for the project.
You can run it locally with:

```bash
cd apps/docs
bun dev
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feat/awesome-feature`)
3. Commit your changes
4. Push and open a PR

---
