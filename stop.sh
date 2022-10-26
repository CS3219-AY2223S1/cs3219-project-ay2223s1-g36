#!/bin/bash
docker-compose -f collab-service/docker-compose.yaml down
docker-compose -f matching-service/docker-compose.yaml down
docker-compose -f user-service/docker-compose.yaml down
docker-compose -f question-service/docker-compose.yaml down
docker-compose -f history-service/docker-compose.yaml down