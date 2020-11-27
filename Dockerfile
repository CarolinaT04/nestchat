# Pull node image from docker hub
FROM node:10-alpine

# Set working directory
RUN mkdir -p /var/www/nestchat
WORKDIR /var/www/nestchat

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/nestchat/node_modules/.bin:$PATH
# create user with no password
RUN adduser --disabled-password chat

# Copy existing application directory contents
COPY . /var/www/nestchat
# install and cache app dependencies
COPY package.json /var/www/nestchat/package.json
COPY package-lock.json /var/www/nestchat/package-lock.json

# grant a permission to the application
RUN chown -R chat:chat /var/www/nestchat
USER chat

# clear application caching
RUN npm cache clean --force
# install all dependencies
RUN npm install

EXPOSE 3004
CMD [ "npm", "run", "start:dev" ]