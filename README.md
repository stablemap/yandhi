This is a response to the true-to-size challenge.

The project runs on [Node.js 12](https://nodejs.org/en/) and makes use of the [Express web framework](https://nodejs.org/en/) and [PostgreSQL 11](https://www.postgresql.org/). For the app to successfully start the environment variable `PG_STRING` must contain a [Postgres connection string](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) containing parameters for a database having [the two tables](postgres/setup.sql) used by the app.

To run the rests, make sure that `PG_STRING` is set up for a test database and execute

```shell
npm run test
```
