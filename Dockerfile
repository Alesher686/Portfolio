FROM node:20.16.0-slim AS base

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN #npm update
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=base /app/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
