# Use the official Node.js image as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json (or yarn.lock if you're using yarn)
# This allows us to install dependencies and cache them efficiently.
COPY package*.json ./

# Install dependencies using npm ci for a clean and fast install
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . ./

# Set environment variable to increase memory limit for Node.js (for large apps)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the application (this will create the .next folder and optimize it)
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Start the application using npm start
CMD ["npm", "start"]
