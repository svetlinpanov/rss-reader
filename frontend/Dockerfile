FROM node:current

# create app directory in container
RUN mkdir -p /app/controlpanel
WORKDIR /app/controlpanel

# only copy package.json and the lock.json initially so that `npm install` layer is recreated only
# if there are changes in package.json
COPY package*.json ./
RUN npm install

# copy files used by webpack
ADD internals /app/controlpanel/internals

# Make sure you have an updated .dockerignore file
# copy all file from current dir to /app in container
COPY . /app/controlpanel

CMD [ "npm", "start" ]