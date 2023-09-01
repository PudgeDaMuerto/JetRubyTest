# JetRubyTest
Test task for NodeJS knowledge

# Stack
- NodeJS
- MongoDB
- Docker

## App
To prepare the app for launch clone repository and run:
```bash
cd ./app
docker-compose up
```
Then change INTERVAL_MINUTES in config.js and run `node app.js`.

After that you can launch cli for more documentation about API:
```bash
cd ../cli
node index.js --help
```