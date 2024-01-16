# Use a Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set a default value for the NEXTJS_PORT environment variable
ENV NEXTJS_PORT=3001

# Set the API base URL for the server
ENV NEXT_SERVER_API_BASE_URL=http://job-search-backend:3000

# Expose the port that Next.js will run on
EXPOSE $NEXTJS_PORT

# Run npm dev with the specified port
CMD ["npm", "run", "dev"]
