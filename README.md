This is a response to the true-to-size challenge.

The project runs on [Node.js 12](https://nodejs.org/en/) and makes use of the [Express web framework](https://nodejs.org/en/) and [PostgreSQL 11](https://www.postgresql.org/). For the app to successfully start the environment variable `PG_STRING` must contain a [Postgres connection string](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) containing parameters for a database having [the two tables](postgres/setup.sql) used by the app.

To run the rests, make sure that `PG_STRING` points to an appropriate test database and execute

```shell
npm run test
```

### Containers

To make setup easy there are Dockerfiles for both the [database](postgres/Dockerfile) and [application](Dockerfile), as well as a compose file making use of these. For this, run

```
docker-compose up
```

The app should be available on port 8080 of the host machine, and it will be automatically connected to the Postgres container.

### API

This is fairly simple. Shoes are created by sending a POST request to `/shoes`. The JSON body should contain the name of the shoe.

```json
{
  "name": "Jordan 1 Retro"
}
```

If this succeeds then the client receives a 201 status code and a shoe id:

```json
{
  "id": 1,
  "name": "Jordan 1 Retro"
}
```

We can then send in true-to-size readings with a POST to `/shoes/1/add_true_to_size` with a body like the following:

```json
{
  "reading": 3
}
```

After doing this a few times, GET requests to `/shoes` and to the individual shoe resources like `/shoes/1` will display average values.