FROM php:8.3-fpm

# Set working directory
WORKDIR /app

COPY . .

RUN apt-get update && apt-get -y install git zip libpq-dev && \
    docker-php-ext-install pdo pdo_pgsql pgsql && \
    rm -rf /var/lib/apt/lists/*

RUN curl -sL https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

RUN setfacl -R -m u:www-data:rwX -m u:`whoami`:rwX ./app/cache ./app/logs
RUN setfacl -dR -m u:www-data:rwX -m u:`whoami`:rwX ./app/cache ./app/logs

COPY ./entrypoint.sh /

# Ensure the container runs as root
USER root

ENTRYPOINT ["sh", "/entrypoint.sh"]

# Default command
CMD ["php-fpm"]
