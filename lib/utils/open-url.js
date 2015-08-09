var config = require('./config');
var opn = require('opn');

module.exports = function(service) {
  return require('./credential-prompt')([{
    name: service + '-url',
    type: 'input'
  }]).then(function(result) {
    var url = result[0].value;

    console.log('opening ' + url);
    opn(url);
  });
};
