#!/bin/sh

echo "Waiting for postgres to start..."

while ! nc -z postgres 5432; do
  sleep 2.0
done

echo "Postgres started"

npm run build
npm run migrate
npm run seed
npm run start
