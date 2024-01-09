FROM alpine:3.18

ENV NODE_VERSION 18.19.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Build the application
RUN npm run build
 
 
