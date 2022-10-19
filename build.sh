#!/bin/bash
docker-compose -f collab-service/docker-compose.yaml build
docker-compose -f matching-service/docker-compose.yaml build
docker-compose -f user-service/docker-compose.yaml build
docker-compose -f question-service/docker-compose.yaml build
docker-compose -f frontend/docker-compose.yaml build