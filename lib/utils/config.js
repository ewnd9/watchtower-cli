var config = require('dot-file-config')('.watchtower-cli-npm');
config.data.credentials = config.data.credentials || {};
config.data.links = config.data.links || {};

module.exports = config;
