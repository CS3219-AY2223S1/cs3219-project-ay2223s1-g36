# User service
Handles user accounts and access to the website

## Running 
If not exists, create a file named `jwt_token` in this directory that contains the token key for JWT. Example content would be `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

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

# Using the service
## Communicate with the service
Send http requests to the service via port `8000`

## API commands
### Creating a user
- `POST /api/user/register`
    - Payload: A req body with the fields `username` & `password`, e.g.
        ```json
        {
            "username": "JOYBCHKW",
            "password": "ILoveCS3219" 
        }
        ```
    - Response: successful status `201` and JSON message, e.g.
        ```json
            {
                "message": "Created new user JOYBCHKW successfully!"
            }
        ```
- `POST /api/user/login`
    - Payload: A req body with the correct fields `username` & `password`, e.g.
        ```json
        {
            "username": "JOYBCHKW",
            "password": "ILoveCS3219" 
        }
        ```
    - Response: successful status `200` and JSON message, e.g.
        ```json
            {
                "message": "JOYBCHKW is logged in.",
                "username": "JOYBCHKW",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2OGM1OTQwN2FiMzBlMzZmOGVkZTg5IiwiaWF0IjoxNjY3ODEwODMxLCJleHAiOjE2Njc4MTgwMzF9.Xy-CA_yQ76Zs0LRiGikBh9pRFndXU_UTDjE2m5PFx3I"
            }
        ```
    - Possible login failures:
        - User attempts a login but has not logged out from his recent login
        - Incorrect credentials
        - User has not created the account before

- `POST /api/user/auth`
    - Payload: A req body containing a field `token`, e.g.
        ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2OGM1OTQwN2FiMzBlMzZmOGVkZTg5IiwiaWF0IjoxNjY3ODEwODMxLCJleHAiOjE2Njc4MTgwMzF9.Xy-CA_yQ76Zs0LRiGikBh9pRFndXU_UTDjE2m5PFx3I"
        }
        ```
    - Response: successful status `200`
    - Possible authentication failure failures:
        - Status `401`: User has not logged in and does not have a token
        - Token issued has expired

- `POST /api/user/deleteAccount`
    - Payload: A req body with the correct fields `username` and `token`, e.g.
        ```json
        {
            "username": "JOYBCHKW",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2OGM1OTQwN2FiMzBlMzZmOGVkZTg5IiwiaWF0IjoxNjY3ODEwODMxLCJleHAiOjE2Njc4MTgwMzF9.Xy-CA_yQ76Zs0LRiGikBh9pRFndXU_UTDjE2m5PFx3I"
        }
        ```
    - Response: successful status `200` and JSON message, e.g.
        ```json
            {
                "message": "Account deleted successfully!"
            }
        ```
    - Possible failures:
        - User is not authenticated / does not have token
        - The token provided does not correspond to the user

- `POST /api/user/updatePassword`
    - Payload: A req body with the correct fields `username`, `newPassword` and `token`, e.g.
        ```json
        {
            "username": "JOYBCHKW1",
            "newPassword": "IRlyyLoveCS3219",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2OGNiNDIwN2FiMzBlMzZmOGVkZTk4IiwiaWF0IjoxNjY3ODEyMTY4LCJleHAiOjE2Njc4MTkzNjh9.RWGZd_aG1mW7KqAq0UUsLer78a0Grw4QbuGloOMWl2E"
        }
        ```
    - Response: successful status `200` and JSON message, e.g.
        ```json
            {
                "message": "Password updated successfully!"
            }
        ```
    - Possible failures:
        - User is not authenticated / does not have token
        - The token provided does not correspond to the user

- `POST /api/user/logout`
    - Payload: A req body with the correct fields `username` and `token`, e.g.
        ```json
        {
            "username": "JOYBCHKW1",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2OGM1OTQwN2FiMzBlMzZmOGVkZTg5IiwiaWF0IjoxNjY3ODEwODMxLCJleHAiOjE2Njc4MTgwMzF9.Xy-CA_yQ76Zs0LRiGikBh9pRFndXU_UTDjE2m5PFx3I",
        }
        ```
    - Response: successful status `200` and JSON message, e.g.
        ```json
            {
                "message": "User logged out successfully"
            }
        ```
    - Possible failures:
        - User is not authenticated / does not have token
        - The token provided does not correspond to the user