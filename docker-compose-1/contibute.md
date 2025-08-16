## Manual Installation

- install node.js locally
- clone the repository
- Install dependencies (npm install)
- Start DB locally (optional)
  - `docker run -e POSTGRES_PASSWORD=mysecret -d -p 5432:5432 postgres`
  - OR
  - Go to neon.tech and create a new DB and get the DB URL
- copy DB url to .env
- npx prisma migrate dev
- npx prisma generate
- npm run build
- npm start

## Docker Installation

- Install Docker
- Create a docker network - `docker network create test-network`
- Start a postgres Instance
  - `docker run -e POSTGRES_PASSWORD=mysecret --name postgres --network test-network -d -p 5432:5432 postgres`
- Build Docker Image - `docker build --network test-network -t user-project .`
- Start Docker Container with image - `docker run --network test-network -e DATABASE_URL=postgresql://postgres:mysecret@postgres:5432/postgres -p 3000:3000 user-project`

## Docker Compose Installation
