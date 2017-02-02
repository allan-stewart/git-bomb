const exec = require('child_process').exec;

module.exports = (dir, command, callback) => {
  console.log({dir, command})
  exec(command, {cwd: dir}, callback)
}
