#!/bin/sh
set -e  # Exit immediately if a command exits with a non-zero status

echo "Starting initialization..."

# Wait for the database to be ready (optional)
if [ "$WAIT_FOR_DB" = "true" ]; then
  echo "Waiting for database connection..."
  until nc -z -v -w30 db 5432; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 1
  done
  echo "Database is ready!"
fi

# Run Doctrine migrations
echo "Running Doctrine migrations..."
php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration

echo "Initialization complete. Starting php-fpm..."

# Hand over control to CMD specified in Dockerfile
exec "$@"