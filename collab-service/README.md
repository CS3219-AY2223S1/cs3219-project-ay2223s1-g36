# Collaboration service
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

## Server will listen:

- `room:join`
  - Message: JSON message
    ```json
    { "roomId": "roomId" }
    ```
- `editor:key`
  - Message: JSON message
    ```json
    {"key": IModelContentChangedEvent}
    ```
- `editor:selection`
  - Message: JSON message
    ```json
    {"selection": ICursorSelectionChangedEvent}
    ```
- `editor:save`

  - Message: JSON message
    ```json
    { "code": "code_content_in_string" }
    ```

- `editor:language`
  - Message: JSON message
    ```json
    { "language": "language" }
    ```
- `message:send`
  - Message: JSON message
    ```json
    { "userId": "userId", "message": "msg" }
    ```
  - The `userId` is the sender's user ID.

## Client should listen:

- `editor:update`
  - Message: IModelContentChangedEvent
- `editor:selection`
  - Message: ICursorSelectionChangedEvent
- `message:receive`
  - Message: JSON message
    ```json
    { "userId": "userId", "message": "msg" }
    ```
  - The `userId` is the sender's user ID.

# Rest API

## Get code from room
- `POST /api/code`
    - Message: JSON message `{"roomId": "id"}`
    - Response: JSON message with code in this room, e.g.
        ```json
        {
            "code": "some code here int x = 0;"
        }
        ```
