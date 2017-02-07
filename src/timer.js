class Timer {
  constructor(callback) {
    this.time = 0
    this.callback = callback
  }

  start(value) {
    this.time = value
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.time--
        this.callback(this.time)
      }, 1000)
    }
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  reset(value) {
    this.time = value
  }
}

module.exports = Timer
