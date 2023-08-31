const views = require("./views.js");
const Path = require("./utils.js").Path;

const paths = [
    new Path("/sync", "GET", views.sync),
    new Path("/task", "GET", views.taskView),
    new Path("/get", "GET", views.getByIDOrName),
    new Path("/getall", "GET", views.getAll)
]

module.exports = { paths }