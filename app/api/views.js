const url = require("url");
const Mongo = require("./database.js").Mongo;
const api = require("./api.js");
const Interval = require("./utils.js").Interval;
const config = require("../config.js");

const MINUTE = 60000;
const mongo = new Mongo(
    `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@127.0.0.1:27017/`,
    config.MONGO_DB, 
    config.MONGO_COLLECTION
);

// Start interval for sync DB with GitHub
const interval = new Interval(forceSync, config.INTERVAL_MINUTES*MINUTE);
interval.startInterval();

// Function for synchronization
async function forceSync(request, response) { 
    console.log("Start synchronization with GitHub API");
    await mongo.connect();
    const counter = await api.getTrendingRepos()
    .then(r => mongo.insertRepos(r.items))
    .catch(err => console.log(err));
    
    return counter;
}

// View for 'sync' that does force synchronization
async function sync(request, response) {
    await forceSync(request, response)
    .then(counter => response.write(
            JSON.stringify({updated_or_inserted: counter})
        )
    );
    interval.refresh();
}

// View for '/get' endpoint that gets repository from 
// DB by ID or Name (function understands what user needs)
async function getByIDOrName(request, response) {
    let urlParams = url.parse(request.url, true).query;
    if (!urlParams.repo) {
        response.write("{error: not found 'repo', pass name of repository or ID}");
        return;
    }
    await mongo.connect();

    // If JS can convert parameter to Number, then it's ID
    // otherwise it's Name of repository
    const repoid = parseInt(urlParams.repo);
    if (repoid) {
        await mongo.getRepoByID(urlParams.repo)
        .then(res => response.write(JSON.stringify(res)));
    } else {
        await mongo.getRepoByName(urlParams.repo)
        .then(res => response.write(JSON.stringify(res)));
    }
}

// View for '/getall' endpoint
async function getAll(request, response) {
    await mongo.connect();

    await mongo.getAllRepos()
    .then(res => response.write(JSON.stringify(res)));
}

module.exports = { sync, getByIDOrName, getAll };