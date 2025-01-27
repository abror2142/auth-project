#!/bin/sh
set -e

echo "Starting initialization..."

if [ "$WAIT_FOR_DB" = "true" ]; then
  echo "Waiting for database connection..."
  until nc -z -v -w30 db 5432; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 1
  done
  echo "Database is ready!"
fi

# Run Composer install if the vendor folder is missing
if [ ! -d "vendor" ]; then
    composer install
fi


php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration

echo "Initialization complete. Starting php-fpm..."

echo "Running chown..."
chown -R www-data:www-data /var
echo "Chown completed..."

exec "$@"