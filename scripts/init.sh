#!/bin/bash
echo "Running startup commands"

git pull

yarn
docker kill $(docker ps -q)
docker-compose up -d
wait
sleep 10 # wait for the database to start
yarn prisma migrate dev
yarn build
wait
yarn prisma db seed
yarn dev:server