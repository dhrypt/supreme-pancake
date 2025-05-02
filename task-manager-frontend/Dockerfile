# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend app
COPY . .

# Expose frontend port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]