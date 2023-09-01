#!/usr/bin/env node
const { description, name, version } = require("./package.json");

const ADDRESS = "127.0.0.1";
const PORT = "8000";

const options = process.argv.slice(2);
const VERSION_MESSAGE = `${name} ${version}`;
const HELP_MESSAGE = `${VERSION_MESSAGE}\n${description}
Usage:
--help          Help documentation
--version       Installed package version
--get ID/Name   Get repository from API by ID or Name
--getall        Get all repositories
--sync          Synchronize DataBase with GitHub API and reset timer
`;

function fetchUrlAndLog(url) {
    fetch(url).then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
}

if (options.includes('--version')) {
    console.log(VERSION_MESSAGE);
    return;
}
if (options.includes('--help')) {
    console.log(HELP_MESSAGE);
    return
}
if (options.includes('--get')) {
    const repo = options[1]
    fetchUrlAndLog(`http://${ADDRESS}:${PORT}/get?repo=${repo}`)
    return;
}
if (options.includes('--getall')) {
    fetchUrlAndLog(`http://${ADDRESS}:${PORT}/getall`)
    return;
}
if (options.includes('--sync')) {
    fetch(`http://127.0.0.1:8000/sync`)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
    return;
}