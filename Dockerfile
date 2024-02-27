# 1
# Do not move to node:11, because there are compatibility issues between node-sass 4.9.3 (this project dependency) and Alpine Linux, see suported environments in:
# Before to go node 11, make tests with newer dependecies and ensure they are up-to-date
# https://github.com/sass/node-sass/releases/tag/v4.9.3# https://github.com/sass/node-sass/releases/tag/v4.9.3
FROM node:10-alpine as builder

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# install npm ( in separate dir due to docker cache)
ADD package.json /tmp/npm_inst/package.json
RUN cd /tmp/npm_inst &&\
    npm install &&\
    mkdir -p /tmp/app &&\
    mv /tmp/npm_inst/node_modules /tmp/app/

# build and publish application
ADD . /tmp/app
RUN cd /tmp/app &&\
    npm run build --prod

FROM nginx:1.15-alpine
# install node
# RUN apk add --no-cache nodejs nodejs-npm
ADD nginx /etc/nginx/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /tmp/app/dist/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]