FROM node 
# the command above is the base image to use, in we case we use the node image latest version
WORKDIR /usr/app
# the command above is the directory to use in the container, it will be created if it doesn't exist
COPY package.json ./
# the command above copy the package.json to the container
RUN npm install && npm install -g ts-node
# the command above install the dependencies
COPY . .
# the command above copy all the files to the container
EXPOSE 3000
# the command above expose the port 3000 for the container to be able to use it
CMD ["npm", "run","dev"]
# the command above is the default command to run when the container is started