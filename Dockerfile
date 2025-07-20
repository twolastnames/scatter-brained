FROM debian:bookworm-slim

USER root
ARG DEPLOY_DIRECTORY=/opt/scatter-brained

RUN mkdir -p $DEPLOY_DIRECTORY
COPY . $DEPLOY_DIRECTORY

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y make

EXPOSE 80
EXPOSE 3000

WORKDIR $DEPLOY_DIRECTORY

ENTRYPOINT ["/usr/bin/make", "clean", "run"]

