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

inquirer.prompt({
  type: 'list',
  name: 'action',
  message: 'Select service',
  choices: [
    github,
    new inquirer.Separator()
  ].concat(links)
}).then(function(result) {
  result.action();
});
