# ---------------------------
# Build Stage
# ---------------------------
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install deps
RUN corepack enable && yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build production bundle
RUN yarn build



# ---------------------------
# 2Production Stage (Nginx)
# ---------------------------
FROM nginx:stable-alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built dist folder from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
