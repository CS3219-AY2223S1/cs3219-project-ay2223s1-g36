# Socket.IO events

Server listens:
- `editor:key`
    - Message: JSON message 
        ```json
        {"roomId": "roomId", "key": IModelContentChangedEvent}
        ```
- `editor:selection`
    - Message: JSON message 
        ```json
        {"roomId": "roomId", "selection": ICursorSelectionChangedEvent}
        ```
- `editor:save`
    - Message: JSON message
        ```json
        {"roomId": "roomId", "code": "code_content_in_string"}
        ```
- `message:send`
    - Message: JSON message
        ```json
        {"roomId": "roomId", "userId": "userId", "message": "msg"}
        ```
    - The `userId` is the sender's user ID.

Client listens:
- `editor:key`
    - Message: IModelContentChangedEvent
- `editor:selection`
    - Message: ICursorSelectionChangedEvent
- `message:receive`
    - Message: JSON message
        ```json
        {"userId": "userId", "message": "msg"}
        ```
    - The `userId` is the sender's user ID.