FROM node:18

WORKDIR /app/

COPY package*.json /

RUN npm install prettier -g

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8002

# Development
CMD ["node", "build/server.js"]

# Production
# RUN npm install -g pm2
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]