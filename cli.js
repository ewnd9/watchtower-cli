#!/usr/bin/env node

var inquirer = require('inquirer-bluebird');
var _ = require('lodash');

var config = require('./lib/utils/config');

var github = {
  name: 'github',
  value: function() {
    return require('./lib/github/main')();
  }
};

var links = _.map(config.data.links, function(url, name) {
  return {
    name: name,
    value: function() {
      console.log('opening ' + url);
      require('opn')(url);
    }
  };
});

links.push({
  name: 'Add link',
  value: function() {
    return require('./lib/utils/links-prompt')();
  }
});

var choices = [github, new inquirer.Separator()].concat(links);

var argv = require('minimist')(process.argv.slice(2));

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
