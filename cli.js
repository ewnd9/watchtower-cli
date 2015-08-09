#!/usr/bin/env node

var inquirer = require('inquirer-bluebird');
var _ = require('lodash');

var argv = require('minimist')(process.argv.slice(2));

var choices = require('./lib/utils/generate-menu');

var service = _.find(choices, function(choice) {
  return _.find(argv, function(value, flag) {
    return choice.name === flag;
  });
});

if (service) {
  service.value();
} else {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Select service',
    choices: choices
  }).then(function(result) {
    result.action();
  });
}
