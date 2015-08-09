var config = require('dot-file-config')('.watchtower-cli-npm');
config.data.credentials = config.data.credentials || {};

module.exports = config;
