FROM php:8.3-fpm

# Set working directory
WORKDIR /app

COPY . .

RUN apt-get update && apt-get -y install git zip libpq-dev && \
    docker-php-ext-install pdo pdo_pgsql pgsql && \
    rm -rf /var/lib/apt/lists/*

RUN curl -sL https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

RUN composer install

COPY ./entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh"]

# Default command
CMD ["php-fpm"]
