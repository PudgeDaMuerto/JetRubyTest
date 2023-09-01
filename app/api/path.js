const views = require("./views.js");
const Path = require("./utils.js").Path;

// Array of Paths must includes all endpoints described in views.js
const paths = [
    new Path("/sync", "GET", views.sync),
    new Path("/get", "GET", views.getByIDOrName),
    new Path("/getall", "GET", views.getAll)
]

module.exports = { paths }