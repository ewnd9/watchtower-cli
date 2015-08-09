#!/usr/bin/env node

var inquirer = require('inquirer-bluebird');

inquirer.prompt({
  type: 'list',
  name: 'service',
  message: 'Select service',
  choices: [
    'github',
    new inquirer.Separator(),
    'google-analytics',
    'google-webmaster'
  ]
}).then(function(result) {
  if (result.service === 'github') {
    require('./lib/github/main')();
  } else if (result.service === 'google-analytics') {
    require('./lib/utils/open-url')('google-analytics');
  } else if (result.service === 'google-webmaster') {
    require('./lib/utils/open-url')('google-webmaster');
  }
});
