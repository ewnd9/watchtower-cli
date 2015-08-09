var config = require('./config');
var inquirer = require('inquirer-bluebird');

module.exports = function(service) {
  return inquirer.prompt([{
    type: 'input',
    name: 'service',
    message: 'New service name'
  }, {
    type: 'input',
    name: 'url',
    message: 'New service url'
  }]).then(function(result) {
    config.data.links[result.service] = result.url;
    config.save();
  })
};
