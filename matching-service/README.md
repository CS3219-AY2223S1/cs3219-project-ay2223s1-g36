# Matching Service
A PeerPrep matching microservice that works on Socket.io

# Prerequisites
- Docker
- docker-compose

# Running the service
```sh
$ docker-compose up --build
```

# Using the service
## Connect to the service
Initiate a socket.io client and connect to the service via port 8001. Configure the socket to listen to events `match:success`, `match:fail`, and `match:pending`.

## Sending match request
Send a `match:find` request along with the desired difficulty message (either `easy`, `medium`, or `hard`).

## Receiving match information
A `match:success` event along with the `roomId` argument will be received by both the clients if the match is found. They will be automatically joined to the same room at `roomId`.

A `match:fail` event along with the difficulty argument will be received if the match is not found after 30 seconds.

A `match:pending` event along with the difficulty argument will be received if a client has a pending match but made another match request.
