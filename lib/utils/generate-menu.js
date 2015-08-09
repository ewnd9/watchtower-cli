var inquirer = require('inquirer-bluebird');
var _ = require('lodash');

var config = require('./config');

var github = {
  name: 'github',
  value: function() {
    return require('./../github/main')();
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
    return require('./input-prompt')('service', 'links');
  }
});

var bins = _.map(config.data.bin, function(cmd, name) {
  return {
    name: name,
    value: function() {
      console.log('running ' + cmd);
      require('./replace-process')(cmd);
    }
  };
});

bins.push({
  name: 'Add binary',
  value: function() {
    return require('./input-prompt')('binary', 'bin');
  }
});

var choices = [github, new inquirer.Separator()].concat(links)
                                                .concat(new inquirer.Separator())
                                                .concat(bins);

module.exports = choices;
