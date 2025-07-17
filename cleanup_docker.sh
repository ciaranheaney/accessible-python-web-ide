#!/bin/bash

# Check for necessary arguments
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <docker image name> <docker container name>"
  exit 1
fi

# Variables
IMAGE_NAME=$1
CONTAINER_NAME=$2

# Stop the container if it's running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping container: $CONTAINER_NAME"
    docker stop $CONTAINER_NAME
    echo ""
fi

# Remove the container if it exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Removing container: $CONTAINER_NAME"
    docker rm $CONTAINER_NAME
    echo ""
fi

# Remove the Docker image if it exists
if [ "$(docker images -q $IMAGE_NAME)" ]; then
    echo "Removing image: $IMAGE_NAME"
    docker rmi $IMAGE_NAME
    echo ""
fi

echo "Cleanup complete."
