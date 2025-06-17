# Stage 1: Build the application
FROM node:22

WORKDIR /app

# Copy only the files needed for npm install
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Copy the rest of your application code
COPY .env ./
COPY ./locales ./locales
COPY ./models ./models
COPY ./modules ./modules
COPY ./scripts ./scripts
COPY ./services ./services
COPY ./bot.js ./
COPY ./logger.js ./
COPY ./options.js ./
COPY ./tsc.js ./

EXPOSE 8081

# Command to run your app
CMD ["node", "bot.js"]