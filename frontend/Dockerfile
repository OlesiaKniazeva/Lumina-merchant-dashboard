FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --verbose
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
