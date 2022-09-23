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
Initiate a socket.io client and connect to the service via port `8001`. 

## Listening to events
Configure the socket to listen to events: 
- `match:success` 
    - Message: `roomId`
    - This event is emitted to the caller of `match:join` if there is a successful match. The room ID is the room that the client should join.
- `match:fail`
    - Message: `difficulty`
    - This event is emitted to the caller of `match:join` if the match is not found after 30 seconds.
- `match:exists`
    - Message: `roomId`
    - This event is emitted to the caller of `match:join` if this current user has an ongoing match with another peer (perhaps the user was disconnected). The room ID of the ongoing match is returned. 
- `room:join:success`
    - Message: JSON message with fields `peer` and `isConnected`. E.g.,  
        ```json
        {"peer": "anotherUserId", "isConnected": bool}
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