FROM node:18-alpine as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm install -g npm
RUN npm i
COPY . .
CMD ["sh", "entrypoint.sh"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g npm
RUN npm i
COPY . .
CMD ["sh", "entrypoint-dev.sh"]
