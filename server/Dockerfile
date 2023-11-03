################################
# Develop stage
################################

FROM node:18-alpine as dev

MAINTAINER ilya <sizov.ilya1996@gmail.com>

#RUN apt-get update && apt-get install -y openssl
RUN apk update && apk add openssl

ENV NODE_ENV development

WORKDIR /usr/src/api

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run prisma:generate

#CMD ["npm", "run", "dev"]

#RUN npm run prisma:migrate

USER node

#################################
# Build stage
#################################
#
FROM node:18-alpine as build

WORKDIR /usr/src/api
#
COPY --chown=node:node --from=dev /usr/src/api/package*.json .
COPY --chown=node:node --from=dev /usr/src/api/node_modules ./node_modules
COPY --chown=node:node --from=dev /usr/src/api/.env .env

COPY --chown=node:node . .

#RUN npm run prisma:migrate

RUN npm run prisma:generate

ENV SERVER_HOST 0.0.0.0

RUN npm run build

ENV NODE_ENV production

RUN npm ci --omit=dev && npm cache clean --force

USER node

################################
# Production stage
################################

FROM node:18-alpine as prod
#
RUN apk update && apk add openssl
#
#RUN apk update && apk add libssl-dev dumb-init -y --no-install-recommends
#RUN apk update && apk add --no-cache libssl-dev dumb-init
#
WORKDIR /usr/src/api
#
COPY --chown=node:node --from=build /usr/src/api/package*.json .
COPY --chown=node:node --from=build /usr/src/api/.env .env
COPY --chown=node:node --from=build /usr/src/api/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/api/dist ./dist
COPY --chown=node:node --from=build /usr/src/api/uploads ./uploads
COPY --chown=node:node --from=build /usr/src/api/prisma ./prisma
#
EXPOSE 4200

ENV PORT 4200
ENV HOSTNAME "0.0.0.0"

#CMD ["node", "dist/main.js"]
CMD ["npm", "run", "start:migrate:prod"]
