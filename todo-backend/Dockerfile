FROM hayd/alpine-deno:1.9.0

LABEL maintainer="Perttu Kärnä <perttu.karna@gmail.com>"

WORKDIR /src/app

COPY . .

RUN deno cache --unstable deps.ts

CMD ["deno", "run", "--allow-net", "--allow-env", "--unstable", "main.ts"]
