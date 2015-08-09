var config = require('./config');
var inquirer = require('inquirer-bluebird');

module.exports = function(title, type) {
  return inquirer.prompt([{
    type: 'input',
    name: 'service',
    message: 'New ' + title + ' name'
  }, {
    type: 'input',
    name: 'url',
    message: 'New ' + title
  }]).then(function(result) {
    config.data[type][result.service] = result.url;
    config.save();
  })
};
