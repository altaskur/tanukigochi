const { ipcRenderer } = require('electron')

const tanukiStatus = {
  hungry: 100,
  happiness: 100,
  sleep: 0
}

const tanukiNotifications = {
  hungry: false,
  happiness: false,
  sleep: false
}
const tanukiMessages = {
  hungry: '',
  happiness: '',
  sleep: ''
}
setInterval(globalTimer, 1000)

function globalTimer () {
  changeStatus('hungry', -1)
  changeStatus('happiness', -1)
  changeStatus('sleep', 1)
}

function changeStatus (param, value) {
  tanukiStatus[param] += value
  tanukiStatus[param] = validateStatus(tanukiStatus[param])
  refreshBar(param)
  showNotification(param)
  resetNotifications(param)
}

function validateStatus (value) {
  value = value < 0 ? 0 : value
  value = value > 100 ? 100 : value
  return value
}

function refreshBar (param) {
  const statusBar = document.querySelectorAll('.statusBar')
  const statusContainers = {
    happiness: statusBar[0],
    hungry: statusBar[1],
    sleep: statusBar[2]
  }
  statusContainers[param].style.width = tanukiStatus[param] + '%'
}

function showNotification (param) {
  let notification = false
  if (param !== 'sleep') {
    if (tanukiStatus[param] <= 25 && !tanukiNotifications[param]) {
      notification = true
    }
  } else {
    if (tanukiStatus[param] >= 75 && !tanukiNotifications[param]) {
      notification = true
    }
  }
  if (notification) {
    tanukiNotifications[param] = true
    ipcRenderer.send('showNotification', { title: param, body: 'Atención tanuki esta a ' + tanukiStatus[param] + ' de ' + param })
  }
}

function resetNotifications (param) {
  if (param !== 'sleep') {
    if (tanukiStatus[param] > 25 && tanukiNotifications[param]) {
      tanukiNotifications[param] = false
    }
  } else {
    if (tanukiStatus[param] < 75 && tanukiNotifications[param]) {
      tanukiNotifications[param] = false
    }
  }
}
