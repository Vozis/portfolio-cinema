################################
# Develop stage
################################

FROM node:18 as dev

MAINTAINER ilya <sizov.ilya1996@gmail.com>

RUN apt-get update && apt-get install -y openssl

ENV NODE_ENV development

WORKDIR /usr/src/api

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run prisma:generate

CMD ["npm", "run", "dev"]

#RUN npm run prisma:migrate

#USER node
#
##################################
## Build stage
##################################
#
#FROM node:18 as build
#
#WORKDIR /usr/src/app
#
#COPY --chown=node:node --from=dev /usr/src/app/package.json .
#COPY --chown=node:node --from=dev /usr/src/app/package-lock.json .
#COPY --chown=node:node --from=dev /usr/src/app/node_modules ./node_modules
#COPY --chown=node:node --from=dev /usr/src/app/.env .env
#COPY --chown=node:node --from=dev /usr/src/app/.env .env
#
#COPY --chown=node:node . .
#
#RUN npm run prisma:generate
#
#RUN npm run build
#
#ENV NODE_ENV production
#
#RUN npm ci --omit=dev && npm cache clean --force
#
#
#USER node
#
#################################
## Production stage
#################################
#
#FROM node:18 as prod
#
##RUN apk update && apk add openssl
#
##RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
#
##WORKDIR /usr/src/app
#
##COPY --chown=node:node --from=dev /usr/src/app/package.json .
##COPY --chown=node:node --from=dev /usr/src/app/package-lock.json .
##COPY --chown=node:node --from=build /usr/src/app/.env .env
#COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
#COPY --chown=node:node --from=build /usr/src/app/dist ./dist
#
#EXPOSE 4200
#
#CMD ["node", "dist/main.js"]
