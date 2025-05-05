# Use a Node.js base image for building the app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight server (nginx) to serve the static files
FROM nginx:alpine

# Copy the build output to nginx's web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the server
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
