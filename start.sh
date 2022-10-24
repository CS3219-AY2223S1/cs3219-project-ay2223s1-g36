#!/bin/bash
docker-compose -f question-service/docker-compose.yaml up -d
docker-compose -f question-service/docker-compose.yaml logs -f -t &
docker-compose -f collab-service/docker-compose.yaml up &
docker-compose -f matching-service/docker-compose.yaml up &
docker-compose -f user-service/docker-compose.yaml up