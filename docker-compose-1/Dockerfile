FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV DATABASE_URL="postgresql://postgres:mysecret@postgres:5432/postgres"

COPY . .

RUN npm run build

CMD ["npm","run", "dev:docker"]