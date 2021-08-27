# build environment
FROM node:14-slim as build
# must be empty directory on virtual machine:
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

# install dependencies 
RUN npm install --prod
# copy all files
COPY . .

RUN npm run build

# next stage: production environment
FROM nginx:stable-alpine
# use previous stage (called build) to copy the build directory:
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# no EXPOSE needed because  FROM NGINX already has a Dockerfile with an EXPOSE 80
# no CMD needed, FROM nginx already does it

# webserver is looking for index.html, because of react router, we need nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf