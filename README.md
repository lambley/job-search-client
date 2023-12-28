## Running the app

Running the app with Docker on localhost/3001:

- First, install [Docker Desktop](https://www.docker.com/products/docker-desktop)

- Then run the following commands:

```zsh
docker-compose build
docker-compose up
```

- If you need to rebuild the image, run:

```zsh
docker-compose down -v # to remove the postgres and redis volumes
docker-compose build --no-cache
```

Alternatively, run the app locally with:
`npm run dev` 
