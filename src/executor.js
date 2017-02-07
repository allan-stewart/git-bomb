const exec = require('child_process').exec;

module.exports = (dir, command, callback) => {
  exec(command, {cwd: dir}, callback)
}
