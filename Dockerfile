# Install dependencies only when needed
FROM node:16.15.0-alpine3.14 AS deps

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN yarn

# Rebuild the source code only when needed
FROM node:16.15.0-alpine3.14 AS builder

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:16.15.0-alpine3.14 AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start:prod"]
