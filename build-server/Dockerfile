# ubuntu image use of focal version
FROM ubuntu:focal
# it update all packages inside of ubuntu

RUN apt-get update
# to call the api we use curl

RUN apt-get install -y curl
# node js v-20 setup  
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
#upgrade

RUN apt-get upgrade -y
#install node js

RUN apt-get install -y nodejs
#install git

RUN apt-get install git -y

WORKDIR /home/app

COPY main.sh main.sh
COPY script.js script.js
COPY package*.json .

RUN npm install

RUN chmod +x main.sh
RUN chmod +x script.js
#ENTERY POINT and AFTER THAT WE MAKE SCRIPT
#this automaticlly running after install above things

ENTRYPOINT [ "/home/app/main.sh" ]