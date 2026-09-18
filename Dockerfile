FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN corepack enable && yarn install --frozen-lockfile && yarn build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
