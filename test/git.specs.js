const Git = require('../src/git')
const assert = require('assert')

describe('git', () => {
  let git, executedCommands, results
  const executor = (directory, command, callback) => {
    executedCommands.push({dir: directory, command})
    let result = results.shift()
    callback(result.err, result.stdout, result.stderr)
  }

  const setupResult = (err, stdout, stderr) => {
    results.push({err, stdout, stderr})
  }

  beforeEach(() => {
    executedCommands = []
    results = []
    git = new Git(executor)
  })

  describe('resetHard', () => {
    let dir = '~/fake-dir'

    it('should call git reset --hard on that directory', done => {
      setupResult(null, 'HEAD is now at fd66683 empty test file\n', '')
      git.resetHard(dir, (success, message) => {
        assert.deepEqual(executedCommands, [
          {dir, command: 'git reset --hard'}
        ])
        done()
      })
    })

    it('should return successful when it works', done => {
      setupResult(null, 'HEAD is now at fd66683 empty test file\n', '')
      git.resetHard(dir, (success, message) => {
        assert.equal(success, true)
        assert.equal(message, 'HEAD is now at fd66683 empty test file\n')
        done()
      })
    })

    it('should return failure with an error code if stderr is empty', done => {
      setupResult({code: 'ENOENT'}, '', '')
      git.resetHard(dir, (success, message) => {
        assert.equal(success, false)
        assert.equal(message, 'Error code: ENOENT')
        done()
      })
    })

    it('should return failure with an error message from stderr', done => {
      setupResult({code: 'ENOENT'}, '', 'Something bad happened')
      git.resetHard(dir, (success, message) => {
        assert.equal(success, false)
        assert.equal(message, 'Something bad happened')
        done()
      })
    })

    it('should return failure with a canned error message if no error code and no stderr', done => {
      setupResult({}, '', '')
      git.resetHard(dir, (success, message) => {
        assert.equal(success, false)
        assert.equal(message, 'An error occurred')
        done()
      })
    })
  })
})
