FROM node:18

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install
RUN npm install -g concurrently

EXPOSE 3003
EXPOSE 4889

# Run both servers at once
CMD ["concurrently", "node internal-server.js", "node main-server.js"]
