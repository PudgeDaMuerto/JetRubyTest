const server = require("./api/server.js").server;
const config = require("./config.js");

server.listen(config.PORT, config.HOSTNAME, () => {
    console.log(`Server started on port ${config.PORT}.`);
})