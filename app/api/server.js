const http = require("http");
const url = require("url");
const route = require("./utils.js").route;
const path = require("./path.js");

const server = http.createServer(async (req, res) => {
    let parsedUrl = url.parse(req.url, true);
    if (!path.paths.some(el => el.endpoint === parsedUrl.pathname)) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end();
        return;
    }
    path.paths.forEach(url => {
        route(req, res, url.endpoint, url.method, url.view);
    });
})

module.exports = { server };
