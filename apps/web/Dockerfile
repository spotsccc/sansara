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

WORKDIR /usr/src/app/apps/web

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
