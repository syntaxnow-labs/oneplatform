# ============================================
# Stage 1 — Build Nx App
# ============================================
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable && yarn install --frozen-lockfile

COPY . .

# Build the app
RUN npx nx build admin-panel


# ============================================
# Stage 2 — Serve with Nginx
# ============================================
FROM nginx:stable-alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/apps/admin-panel/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
