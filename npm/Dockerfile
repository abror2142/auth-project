# Step 1: Use an official Node.js runtime as a base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Step 4: Install dependencies (npm packages)
RUN npm install

# Step 5: Copy the rest of your application’s code into the container
COPY . .

# Step 6: Install Tailwind CSS dependencies and build the CSS file
RUN npm run build:css  # This assumes you have "build:css" script in package.json

# Step 7: Expose the port your app will run on (adjust this as needed)
EXPOSE 3000

# Step 8: Define the command to run the application (assumes you're using npm start)
CMD ["npm", "start"]
