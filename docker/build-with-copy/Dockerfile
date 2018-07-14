FROM nginx:latest
LABEL maintainer 'Jonhatan Haisi <jonathan_haisi@hotmail.com>'

RUN echo '<h1>Without content</h1>' > /usr/share/nginx/html/content.html
COPY *.html /usr/share/nginx/html/
