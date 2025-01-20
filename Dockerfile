FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]