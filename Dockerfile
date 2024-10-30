# Use the official Node.js image from the Docker Hub
FROM node:16 AS frontend

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend_react/cos-frontend/package*.json ./

# Copy config.json
COPY frontend_react/cos-frontend/config.json ./config.json


# Install dependencies
RUN npm install

# Copy the React app files
COPY frontend_react/cos-frontend .

# Build the React app
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the React app
#CMD ["serve", "-s", "build"]
CMD serve -s build
