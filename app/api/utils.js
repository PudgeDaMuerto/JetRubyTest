const url = require("url");

class Interval {
    constructor(func, time) {
        this.func = func;
        this.time = time;
    }
    
    startInterval() {
        this.func();
        this.interval = setInterval(this.func, this.time);
    }

    refresh() {
        this.interval.refresh();
    }
}

class Path {
    constructor (endpoint, method, view) {
        this.endpoint = endpoint;
        this.method = method;
        this.view = view;
    }
}

async function route(request, response, endpoint, method, task) {
    let parsedUrl = url.parse(request.url, true);
    if (parsedUrl.pathname === endpoint && request.method === method) {
        response.writeHead(200, {"Content-Type": "application/json"});
        await task(request, response);
        response.end();
    }
}

module.exports = { Interval, Path, route };