class Git {
  constructor(executor) {
    this.executor = executor
  }

  resetHard(dir, callback) {
    this.executor(dir, 'git reset --hard', (err, stdout, stderr) => {
      let wasSuccessful = !err
      let message = wasSuccessful ? stdout : getErrorMessage(err, stderr)
      callback(wasSuccessful, message)
    })
  }
}

const getErrorMessage = (err, stderr) => {
  if (stderr.length > 0) return stderr
  if (err.code) return 'Error code: ' + err.code
  return 'An error occurred'
}

module.exports = Git
