# CS3219-AY22-23-Project-Skeleton

This is a template repository for CS3219 project.

## User Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run User Service using `npm run dev`.

**Please add a string to user-service/.env for the program to run correctly**

## Frontend
1. Install npm packages using `npm i`.
2. Run Frontend using `npm start`.

## Matching Service
Matching service is linked as a submodule. To get the submodule working, run:

```sh
$ git submodule init
$ git submodule update
```