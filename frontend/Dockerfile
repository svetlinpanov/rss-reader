FROM node:current as build

WORKDIR /usr/src/app

COPY package.json ./
RUN npm i

COPY . ./

RUN npm run build

FROM nginx
COPY --from=build /usr/src/app/build /var/www/

COPY ./app/.nginx.conf /etc/nginx/nginx.conf

#COPY .htpasswd /etc/apache2/.htpasswd
CMD ["nginx", "-g", "daemon off;"]