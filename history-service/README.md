# History-Service

## Prerequisites
- Docker
- docker-compose

## Running the service
Ensure that the following services are running:

* Collab-service
* Match-service

To run the program:

```sh
$ docker-compose build
$ docker-compose up
```

## Routes

## Getting all past matches for the user
- `GET /api/history/getUserHistory/:userId`
    - Response: JSON message with list of past match history, e.g.
        ```json
        {
            [
                {
                    "id":1, // match id, created in sequence
                    "roomId":"7290b605-a967-4feb-8eaa-bfae89a48e63",
                    "questionId": 123,
                    "difficulty":"easy",
                    "ongoing":false,
                    "createdAt":"2022-09-22T10:56:30.722Z",
                    "updatedAt":"2022-09-22T12:14:23.470Z",
                    "partner":"someuuid"
                },
            ]
        }

## Getting the code and programming language for the user
- `GET /api/history/getMatchCode/:roomId`
    - Response: JSON message with the code saved and language used for the library, e.g.
        ```json
        {
            [
                {
                    "code": "some code here",
                    "language": "JavaScript"
                },
            ]
        }