# ---- Base Node image ----
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# ---- Dependencies stage ----
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# ---- Build stage ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Production stage ----
FROM base AS runner
ENV NODE_ENV production
RUN addgroup --system app && adduser --system app -G app
USER app
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
