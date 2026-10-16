# --------------------------
# Build stage
# --------------------------
FROM node:22-bookworm AS builder

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . .

RUN npm run build 

# --------------------------
# Runtime stage
# --------------------------
FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["npm", "run", "start"]
