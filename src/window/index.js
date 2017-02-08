const ipc = require('electron').ipcRenderer
const {dialog} = require('electron').remote

const pickDirSection = document.getElementById('pick-dir')
const pickDirButton = document.getElementById('pick-dir-button')
const selectMinutesSection = document.getElementById('select-minutes')
const minutesInput = document.getElementById('minutes')
const startButton = document.getElementById('start-button')
const timerSection = document.getElementById('timer')
const infoSection = document.getElementById('info')

pickDirButton.addEventListener('click', _ => {
  var dir = dialog.showOpenDialog({
    title: 'Select directory to git bomb',
    properties: ['openDirectory']
  })

  if (dir) {
    ipc.send('setDirectory', dir[0])
    pickDirSection.classList.add('hidden')
    selectMinutesSection.classList.remove('hidden')
  }
})

startButton.addEventListener('click', _ => {
  let seconds = minutesInput.value * 60
  displaySeconds(seconds)
  ipc.send('start', seconds)
  selectMinutesSection.classList.add('hidden')
  timer.classList.remove('hidden')
})

ipc.on('tick', (event, seconds) => {
  displaySeconds(seconds)
})

function displaySeconds(seconds) {
  let min = Math.floor(seconds / 60)
  let sec = seconds % 60
  timerSection.innerHTML = pad(min) + ":" + pad(sec)
}

function pad(value) {
  return value < 10 ? "0" + value : value
}

ipc.on('boom', (event, message) => {
  displayMessage(message, false)
})

ipc.on('error', (event, message) => {
  displayMessage(message, true)
})

function displayMessage(message, isError) {
  infoSection.innerHTML = message
  if (isError) {
    infoSection.classList.add('error')
  } else {
    infoSection.classList.remove('error')
  }
  infoSection.classList.remove('hidden')
  setTimeout(() => infoSection.classList.add('hidden'), 5000)
}
