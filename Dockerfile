FROM node:12.16.1-alpine
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 8080
# start app
CMD ["npm", "run", "serve"]
