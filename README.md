# Gamemind API

## NODE JS + POSTGRESQL

### Run project locally

1. Create your postgresql db and add to the .env file the params to access your local database.

- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_HOST
- MAX_POOL_SIZE
- LOGGER_LEVEL
- DB_PORT

2. Install all the dependencies
```bash
npm install
```
3. Run migrations
```bash
npm run migrate
```
4. Run seed
```bash
npm run seed
```
5. Run the server in port 3000
```bash
npm start
```

### Run project using docker compose

```bash
docker compose up
```