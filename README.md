# PeerPrep
## Running all services locally
First, build all the services. This needs to be run every time there's code changes.
```sh
$ bash build.sh
```

Then, spin up the containers. It may take a while for frontend to be started.
```sh
$ bash start.sh
```

To stop all the containers, run
```sh
$ bash stop.sh
```

## Running individual service
Go into respective folder and run
```sh
$ docker-compose up --build
```