# Collaboration service
Enable real-time editor collaboration and chat functionalities via Socket.IO.

## Running the service

```sh
$ docker-compose up --build
```

## Stopping the service
```sh
$ docker-compose down
```

## Testing the service
```sh
$ docker-compose -f docker-compose.test.yaml up --build --abort-on-container-exit
```

# Socket.IO events

## Server will listen to events:

- `room:join`
  - Join a user to the room with `roomId`.
  - Message: JSON message
    ```json
    { "roomId": "roomId" }
    ```
- `editor:key`
  - Broadcast a monako key event to the room where the user previously joined.
  - Message: JSON message
    ```json
    {"key": IModelContentChangedEvent}
    ```
- `editor:selection`
  - Broadcast a selection monako key event to the room.
  - Message: JSON message
    ```json
    {"selection": ICursorSelectionChangedEvent}
    ```
- `editor:save`
  - Save the code along with the language to the database.
  - Message: JSON message
    ```json
    { "code": "code_content_in_string", "language": "JavaScript" }
    ```

- `editor:language`
  - Change the language of the editor
  - Message: JSON message
    ```json
    { "language": "language" }
    ```

- `message:send`
  - Broadcast a chat message to the room.
  - Message: JSON message
    ```json
    { "userId": "userId", "messageId": 9, "message": "msg" }
    ```
  - The `userId` is the sender's user ID.

## Client should listen to events:

- `editor:update`
  - Whenever there's any key event received from another player.
  - Message: IModelContentChangedEvent
- `editor:selection`
  - Whenever there's any seleciton event received from another player.
  - Message: ICursorSelectionChangedEvent
- `message:receive`
  - Whenever there's a chat message received from another player.
  - Message: JSON message
    ```json
    { "userId": "userId", "messageId": 9, "message": "msg" }
    ```
  - The `userId` is the sender's user ID.
- `user:disconnect`
  - Sent when the other user in the room disconnects involuntarily.
  - Message: None
- `user:leave`
  - Sent when the other user in the room leaves the room voluntarily.
  - Message: None

# Rest API

## Get code from room
- `POST /api/code`
    - Message: JSON message `{"roomId": "id"}`
    - Response: JSON message with code in this room, e.g.
        ```json
        {
            "code": "some code here int x = 0;",
            "language": "JavaScript"
        }
        ```
