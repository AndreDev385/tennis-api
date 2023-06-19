#!/bin/sh

echo "Waiting for postgres to start..."

while ! nc -z postgres 5432; do
  sleep 2.0
done

echo "Postgres started"

npm run db:create:dev
npm run migrate:dev
npm run seed:dev
npm run start
