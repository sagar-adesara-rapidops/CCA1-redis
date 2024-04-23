# FROM node:alpine
# WORKDIR /usr/app
# COPY ./package.json ./
# RUN npm install
# COPY ./ ./
# CMD ["npm", "start"]


FROM node:18.13.0

WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "run", "start" ]
# CMD ["gnome-terminal -e" , "npm", "run" , "start;" , "gnome-terminal -e" , "npm", "run" ,"userCreated;", "gnome-terminal -e" , "npm", "run" ,"folderCreated;","gnome-terminal -e" , "npm", "run" ,"mailFetched" ]FROM node:alpine
