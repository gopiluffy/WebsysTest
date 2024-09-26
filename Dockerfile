# Step 1: Build the Angular project
# Use an official Node.js image as the base image for building the Angular app
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /WebSysConfig

# Copy the package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install Angular CLI and project dependencies
RUN apk update && apk add npm
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application in production mode
RUN npm run build 

# Step 2: Serve the Angular app using NGINX
# Use an NGINX image as the base image for serving the app
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /WebSysConfig/dist/web-sys-config/usr/share/nginx/html .


# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
