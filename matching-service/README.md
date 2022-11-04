# Matching Service
A PeerPrep matching microservice that works on Socket.io

# Prerequisites
- Docker
- docker-compose

# Running the service
```sh
$ DOCKER_BUILDKIT=1 docker-compose build
$ docker-compose up
```

# Tearing down
```sh
$ docker-compose down
```

# Testing
```sh
$ docker-compose build test
$ docker-compose run --rm test
```

# Troubleshooting
If there's some new updates to the code that changes the database layout, errors related to the database migth be thrown when using the service. In that case, try removing the docker volume and restart again by doing:
```sh
$ docker-compose down -v
$ docker-compose up
```

# Using the service
## Connect to the service
Initiate a socket.io client and connect to the service via port `8001`. 

## Listening to events
Configure the socket to listen to events: 
- `match:success` 
    - Message: `{"roomId": "id", "questionId": "id"}`
    - This event is emitted to the caller of `match:join` if there is a successful match. The room ID is the room that the client should join, and the questionId is the id that should be used to query question service.
- `match:fail`
    - Message: `difficulty`
    - This event is emitted to the caller of `match:join` if the match is not found after 30 seconds.
- `match:exists`
    - Message: `{"roomId": "id", "questionId": "id"}`
    - This event is emitted to the caller of `match:join` if this current user has an ongoing match with another peer (perhaps the user was disconnected). The room ID and question ID of the ongoing match is returned. 
- `room:join:success`
    - Message: JSON message with fields as shown:  
        ```json
        {"peer": "anotherUserId", "isConnected": bool, "roomId": "roomId", "difficulty": "difficulty"}
        ```
    - This event is emitted to the caller of `room:join` if the user has successfully joined the room. The user ID of the peer along with whether that peer is already in the room yet is returned in the message.
- `room:join:fail`
    - Message: `roomId`
    - This event is emitted to the caller of `room:join` if the attempt to join the room failed. This could be due to multiple reasons such as the room doesn't exists, the room is inactive, or the user does not have the permission to join that room.
- `room:leave:success`
    - Message: `roomId`
    - This event is emitted to the caller of `room:leave` if the user has successfully left the room. The room ID of the room that the user just left is returned in the message.
- `room:leave:fail`
    - Message: `roomId`
    - This event is emitted to the caller of `room:leave` if the attempt to leave the room failed. This could be due to multiple reasons such as the room doesn't exists, the room is inactive, or the user is not supposed to be in the room.
- `room:close`
    - Message: `roomId`
    - This event is emitted to everyone in the room with `roomId` if either one party inside the room left the room (the party just left won't receive this because he has left the room). 

## Sending requests
The following requests could be sent to this service:
- `match:find` 
    - Message: JSON message with fields `userId` and `difficulty`. UserId is the ID of the logged in user and difficulty is one of `easy`, `medium`, or `hard`. E.g.,
        ```json
        {"userId": "someuuid", "difficulty": "hard"}
        ```
    - Find a match with the difficulty specified.
- `room:join`
    - Message: JSON message with fields `userId` and `roomId`. E.g.,
        ```json
        {"userId": "someuuid", "roomId": "roomuuid"}
        ```
    - Join the user to the room with ID `roomId`. The `roomId` could be gotten from the event `match:success` after calling `match:find`. Note that instead of joining the room on the socket client side, this service should be used instead for the server to update the match metadata.
- `room:leave`
    - Message: JSON message with fields `userId` and `roomId`. E.g.,
        ```json
        {"userId": "someuuid", "roomId": "roomuuid"}
        ```
    - Leave the user from the room with ID `roomId`. This should only be called if the user is currently in a ongoing match in that room.

# REST API
## Getting all matches
- `GET /api/match/get/all`
    - Response: JSON message with list of matches, e.g.
        ```json
        {
            "matches": [
                {
                    "id":1,
                    "roomId":"7290b605-a967-4feb-8eaa-bfae89a48e63",
                    "questionId": 123,
                    "user1Id":"someuuid2",
                    "user2Id":"someuuid",
                    "difficulty":"easy",
                    "ongoing":false,
                    "createdAt":"2022-09-22T10:56:30.722Z",
                    "updatedAt":"2022-09-22T12:14:23.470Z"
                },
            ]
        }
        ```

## Getting matches for a specific user
- `POST /api/match/get/user`
    - Message: `{"userId": "id"}`
    - Response: JSON message with list of matches for the user, e.g.
        ```json
        {
            "matches": [
                {
                    "id":1,
                    "roomId":"7290b605-a967-4feb-8eaa-bfae89a48e63",
                    "questionId": 123,
                    "user1Id":"someuuid2",
                    "user2Id":"someuuid",
                    "difficulty":"easy",
                    "ongoing":false,
                    "createdAt":"2022-09-22T10:56:30.722Z",
                    "updatedAt":"2022-09-22T12:14:23.470Z"
                },
            ]
        }
        ```

## Getting matches for a specific room
- `POST /api/match/get/room`
    - Message: `{"roomId": "id"}`
    - Response: JSON message with list of matches (with 1 element since roomId is unique) for the room, e.g.
        ```json
        {
            "matches": [
                {
                    "id":1,
                    "roomId":"7290b605-a967-4feb-8eaa-bfae89a48e63",
                    "questionId": 123,
                    "user1Id":"someuuid2",
                    "user2Id":"someuuid",
                    "difficulty":"easy",
                    "ongoing":false,
                    "createdAt":"2022-09-22T10:56:30.722Z",
                    "updatedAt":"2022-09-22T12:14:23.470Z"
                },
            ]
        }
        ```

# Deployment
In production need to supply the following environment variables/secrets:
- DB_USER,
- DB_PASSWORD,
- DB_NAME,
- PROD_SQL_DIALECT,
- PROD_SQL_HOST