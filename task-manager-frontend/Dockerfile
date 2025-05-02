# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the files
COPY . .

# Expose frontend port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]