FROM node:14-alpine as build

WORKDIR /src/app

COPY . .

RUN npm install && npm run build

RUN npm prune --production

FROM node:14-alpine as app

ENV APP_USER=app-user
ENV HOME=/opt/app

RUN adduser -D ${APP_USER}

WORKDIR ${HOME}
RUN chown ${APP_USER}:${APP_USER} ${HOME}
COPY --from=build --chown=${APP_USER}:${APP_USER} /src/app ./

USER ${APP_USER}:${APP_USER}

ENTRYPOINT [ "npm", "start" ]
