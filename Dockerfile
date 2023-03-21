FROM node:18-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY .env tsconfig.json logger.ts app.ts ./

# creates the directory ./dist (/app/dist) and builds the project.
RUN yarn build
EXPOSE 3000
CMD ["yarn", "serve"]

