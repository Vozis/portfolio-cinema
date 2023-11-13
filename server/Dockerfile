################################
# Develop stage
################################
FROM node:18.16.0-alpine as dev
MAINTAINER ilya <sizov.ilya1996@gmail.com>
RUN apk update && apk add openssl

WORKDIR /usr/src/api

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./

ENV NODE_ENV development
ENV POSTGRES_PORT 5432
ENV POSTGRES_HOST postgres

RUN npm ci
COPY --chown=node:node . .
RUN npm run prisma:generate

#CMD ["npm", "run", "dev"]
#RUN npm run prisma:migrate
#################################
# Build stage
#################################
FROM node:18.16.0-alpine as build
WORKDIR /usr/src/api

COPY --from=dev /usr/src/api/package*.json .
COPY --from=dev /usr/src/api/node_modules ./node_modules
COPY --from=dev /usr/src/api/uploads ./uploads
COPY --from=dev /usr/src/api/.env .env
COPY --chown=node:node . .

ENV POSTGRES_PORT 5432
ENV POSTGRES_HOST postgres
ENV SERVER_HOST 0.0.0.0
ENV NODE_ENV production

RUN npm run prisma:generate
RUN npm run build
RUN npm ci --omit=dev && npm cache clean --force

USER node

################################
# Production stage
################################
FROM node:18.16.0-alpine as prod
RUN apk update && apk add openssl
#RUN apk update && apk add libssl-dev dumb-init -y --no-install-recommends
#RUN apk update && apk add --no-cache libssl-dev dumb-init
WORKDIR /usr/src/api

COPY --from=build /usr/src/api/package*.json .
COPY --from=build /usr/src/api/.env .env
COPY --from=build /usr/src/api/node_modules ./node_modules
COPY --from=build /usr/src/api/dist ./dist
COPY --from=build /usr/src/api/uploads ./uploads
COPY --from=build /usr/src/api/prisma ./prisma

ENV POSTGRES_PORT 5432
ENV POSTGRES_HOST postgres
ENV PORT 4201
ENV HOSTNAME "0.0.0.0"
EXPOSE ${PORT}

#CMD ["node", "dist/main.js"]
CMD ["npm", "run", "start:migrate:prod"]
