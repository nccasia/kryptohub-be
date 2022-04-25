FROM nginx:1.13

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY public /usr/share/nginx/html
