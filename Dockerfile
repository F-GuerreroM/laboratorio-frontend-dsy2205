FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

RUN rm -rf .angular
RUN npx ng build --configuration=production

FROM nginx:alpine

COPY --from=build /app/dist/laboratorio-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]