#!/bin/bash

# Ensure the SQLite database file exists
touch database/database.sqlite

# Fix permissions — needed because volume mounts override Dockerfile chown
chown -R www-data:www-data storage bootstrap/cache database
chmod -R ug+rwX storage bootstrap/cache database

# Laravel setup (optional but helpful)
php artisan config:clear
php artisan config:cache
php artisan migrate --force || true

# Start Apache (this image uses php:apache)
apache2-foreground
