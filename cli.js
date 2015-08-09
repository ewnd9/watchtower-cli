#!/usr/bin/env node

var inquirer = require('inquirer-bluebird');

inquirer.prompt({
  type: 'list',
  name: 'service',
  message: 'Select service',
  choices: ['github']
}).then(function(result) {
  if (result.service === 'github') {
    require('./lib/github/main')();
  }
});
