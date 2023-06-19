#!/bin/bash

# waiting Redis start up
./scripts/wait-for-it.sh -t 0 redis:6381 -- echo "Redis have start up!"

# waiting MySQL start up
./scripts/wait-for-it.sh -t 0 mysql:3308 -- echo "MySQL have start up!"

# run server
function start_server {
    node build/server.js
}

# waiting services start up
wait_for_services() {
    echo "Waiting Redis, MySQL && RabbitMQ start up..."
    ./scripts/wait-for-it.sh -t 0 redis:6381 -- \
    ./scripts/wait-for-it.sh -t 0 mysql:3308 -- \
    start_server
}

# process services start up
wait_for_services