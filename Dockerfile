# Node.js Version 4
FROM node:4.0.0

# Create a src folder
RUN mkdir /src

# Install nodemon global
RUN npm install nodemon -g

WORKDIR /src

# important step, copy package.json into /src instead /src/app
# because /src/app will be mounted with host directory for development
# this would overwrite the installed node_modules folder.
# but inside /src the node_modules folder is save

ADD app/package.json /src/package.json

#install packages inside /src
RUN npm install && pwd

EXPOSE 9001
CMD ["npm", "start"]
