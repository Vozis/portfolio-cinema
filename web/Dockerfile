################################
# Develop stage
################################
FROM node:18-alpine as dev
MAINTAINER ilya <sizov.ilya1996@gmail.com>
RUN apk update && apk add --no-cache libc6-compat

WORKDIR /usr/src/web
COPY package*.json ./

ENV NODE_ENV development

RUN npm ci
COPY . .
################################
# Build stage
################################
FROM node:18-alpine as build
WORKDIR /usr/src/web

COPY --from=dev /usr/src/web/package*.json .
COPY --from=dev /usr/src/web/node_modules ./node_modules
COPY  . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV REACT_APP_UPLOADS_URL http://host.docker.internal:4200
ENV UPLOAD_HOST api
ENV REACT_APP_DOCKER_URL cinema.ilyasizov.webtm.ru
ENV APP_PORT 3001

#RUN npm run build
ENV NODE_ENV production
#RUN #npm ci --omit=dev && npm cache clean --force

EXPOSE ${APP_PORT}
ENV HOSTNAME "0.0.0.0"
CMD ["npm", "run" ,"start:prod"]
###############################
# Production stage
###############################
FROM node:18-alpine as prod
WORKDIR /usr/src/web

ENV NODE_ENV production
ENV REACT_APP_UPLOADS_URL http://host.docker.internal:4200
ENV APP_PORT 3001

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /usr/src/web/public ./public
COPY --from=build /usr/src/web/.env .
COPY --from=build /usr/src/web/next.config.js .

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=build --chown=nextjs:nodejs /usr/src/web/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /usr/src/web/.next/static ./.next/static
USER nextjs

EXPOSE ${APP_PORT}
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]