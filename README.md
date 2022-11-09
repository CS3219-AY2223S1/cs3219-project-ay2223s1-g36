# PeerPrep
A web application that helps students better prepare themselves for technical interviews.

Deployed endpoint: https://frontend-lpaj6pcqsa-as.a.run.app/

# Development
## Prerequisite
Make sure a `jwt_token` file with a token key is created under `user-service`. More details could be found in the `README.md` under `user-service` folder.

## Running all services locally
First, build all the services. This needs to be run every time there's code changes.
```sh
$ bash build.sh
```

Then, spin up the containers.
```sh
$ bash start.sh
```

Open another terminal and go into `frontend` directory and run
```sh
$ npm start
```

To stop all the containers, run
```sh
$ bash stop.sh
```

## Running individual service
Go into respective folder and run:
```sh
$ docker-compose up --build
```
The documentation for each service could be found under the respective folder as well.

# Deployment
The services are deployed to Google Cloud Run for easier management and scalability. Continuous Deployment is setup such that every time the code is pushed to `production` branch, the services will be updated and pushed to production. The general steps to deploy the services are outlined below.

1. Create as many services on Cloud Run as needed by the application
1. Create as many mongodb databases on MongDB Atlas as needed by the services
1. Create as many Cloud SQL databases as needed by the services
1. Use Google Secret Manager to store the secrets such as database password needed by the services
1. Create or use an existing service account. Make sure it has all the required permissions to access the databases and secrets.
1. Download the service account key as JSON and add it to the secrets on Github repo to grant permission to Github Action to push the changes.
1. In `.github/workflows/cicd.yaml`, setup the environment variables and secrets as needed by each service.