module.exports = function(cmd) {
  var kexec = require('kexec');
  var spawnargs = require('spawn-args');

  var data = spawnargs(cmd, { removequotes: true });

  var cmd = data.splice(0, 1)[0];
  var args = data;

  kexec(cmd, args);
};
