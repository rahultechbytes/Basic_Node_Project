# specify the node base image with your desired version node:<version>
FROM node:10

WORKDIR /
COPY package*.json ./
RUN npm --build-from-source install bcrypt
RUN npm install
COPY . /
CMD [ "npm", "run", "dev" ]