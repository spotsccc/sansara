FROM node:22

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the api package.json
COPY apps/server/package.json ./apps/server/package.json

RUN npm install

# Copy app source
COPY . .

RUN npm run build:server

EXPOSE 8080

CMD [ "npm", "run", "start:server" ]
