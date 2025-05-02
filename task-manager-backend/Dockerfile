# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Install backend dependencies
COPY package*.json ./
RUN npm install

# Copy the backend app files
COPY . .

# Expose backend port (5001 as per your setup)
EXPOSE 5001

# Start the backend server
CMD ["node", "server.js"]