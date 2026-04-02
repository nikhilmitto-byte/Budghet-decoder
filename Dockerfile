# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
