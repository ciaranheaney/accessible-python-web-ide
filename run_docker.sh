#!/bin/bash

# Check for necessary arguments
if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <docker image name> <docker container name> <port number>"
  exit 1
fi

# Variables from command line
IMAGE_NAME=$1
CONTAINER_NAME=$2
PORT=$3
DOCKERFILE_PATH="."

# Build the Docker image
echo "Building Docker image: $IMAGE_NAME"
docker build -t $IMAGE_NAME $DOCKERFILE_PATH
echo ""

# Check if container is already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping and removing existing container: $CONTAINER_NAME"
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    echo ""
fi

# Run the container in detached mode
echo "Running Docker container: $CONTAINER_NAME"
docker run -d --name $CONTAINER_NAME -p $PORT:5000 $IMAGE_NAME
echo ""

# Show container status
docker ps -f name=$CONTAINER_NAME
