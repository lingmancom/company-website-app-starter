FROM lingman/node-build as build-stage

WORKDIR /app

RUN node -v

RUN npm config set registry https://registry.npmmirror.com/
COPY . .

RUN npm -v
RUN pnpm -v
RUN pnpm i
RUN pnpm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
