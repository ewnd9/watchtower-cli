var inquirer = require('inquirer-bluebird');
var Promise = require('bluebird');

var _ = require('lodash');
var config = require('./config');

module.exports = function(questions) {
  var result = _.map(questions, function(question) {
    return {
      name: question.name,
      value: config.data.credentials[question.name]
    };
  });

  var filtered = _.filter(result, function(x) {
    return typeof x.value !== 'undefined';
  });

  if (result.length === filtered.length) {
    return Promise.resolve(result);
  } else {
    var xs = _.map(questions, function(question) {
      return {
        type: question.type,
        message: question.name,
        name: question.name
      }
    });

    return inquirer.prompt(xs).then(function(answers) {
      var result = _.map(answers, function(answer, name) {
        config.data.credentials[name] = answer;

        return {
          name: name,
          value: answer
        };
      });

      config.save();

      return result;
    });
  }
};
