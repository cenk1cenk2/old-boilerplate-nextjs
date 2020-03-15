FROM nginx:alpine

COPY /dist /usr/share/nginx/html
COPY /build/nginx/nginx.conf /etc/nginx/

RUN apk --no-cache --no-progress add tini

ENTRYPOINT ["tini", "--", "nginx", "-g", "daemon off;"]