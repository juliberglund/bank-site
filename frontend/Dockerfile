FROM node:alpine
WORKDIR /app

#flyttar package.json till ./ -> /app/package.json
COPY package*json ./ 

#/app/package.json
#/app/node_modules
RUN npm install

#/app/package.json
#/app/node_modules
# /app/(hela projektet)
COPY . .

RUN npm run build

EXPOSE 3000

CMD  ["npm", "start"]