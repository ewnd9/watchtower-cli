module.exports = function() {

  var config = require('./../utils/config');

  var username = {
    name: 'github-username',
    type: 'input'
  };

  var password = {
    name: 'github-password',
    type: 'password'
  };

  return require('./../utils/credential-prompt')([username, password]).then(function(result) {
    var GithubSearcher = require('github-search-api');
    var github = new GithubSearcher({
      username: result[0].value,
      password: result[1].value
    }); // stupid :(

    var _ = require('lodash');

    var params = {
      'term': 'is:issue is:open user:' + result[0].value
    };

    github.searchIssues(params, function(response) {
      var result = _.map(response.items, function(issue) {
        return {
          repo: issue.url.split('/')[5],
          url: issue.url,
          title: issue.title,
          labels: issue.labels
        };
      });

      var repos = _.groupBy(result, 'repo');
      var chalk = require('chalk');

      _.each(repos, function(issues, repo) {
        console.log(chalk.red(repo));

        _.each(issues, function(issue) {
          var labels = _.map(issue.labels, function(label) {
            // return chalk.white.bgRed(label.name);
            return label.name;
          }).join(', ');

          console.log(' - ' + issue.title.trim() + (labels.length > 0 ? ' (' + labels + ')' : ''));
        });
      });
    });
  });
};
