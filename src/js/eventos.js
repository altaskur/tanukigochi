const path = require('path')
const eventTypes = {
  hungry: 'hungry',
  sleep: 'sleep',
  happiness: 'happiness',
  annoyance: 'annoyance'
}
const eventList = []

let altasQueueStatus = false
let lastStatus = 'idle'

// eslint-disable-next-line
function onNewEvent (type) {

  const isValidType = getEventType(type)
  if (isValidType) {
    addTanukiEvent(type)
    processAltasQueue()
  }
}

function getEventType (type) {
  return Object.values(eventTypes).includes(type)
}
function addTanukiEvent (type) {
  eventList.push(type)
}

function processAltasQueue () {
  console.log(eventList)
  console.log('Process queue')
  if (!altasQueueStatus) {
    startTanukiEvent(eventList[0])
    setTimeout(clearEvent, 4300)
  }
}

function startTanukiEvent (type) {
  altasQueueStatus = true

  getSound(type)
  startAnimation(type)
}

function startAnimation (type) {
  const tanukiDiv = document.querySelector('div.tanuki')
  tanukiDiv.classList.remove(lastStatus)
  lastStatus = type
  tanukiDiv.classList.add(type)
}

function getSound (type) {
  const soundsList = {
    hungry: ['eat1.aac', 'eat2.aac'],
    sleep: [''],
    happiness: ['tanuki1.aac', 'tanuki2.aac'],
    annoyance: ['annoyance3.aac', 'annoyance2.aac', 'annoyance1.aac']
  }
  const soundPath = path.join(__dirname, '/assets/audios/')

  const eventSounds = soundsList[type]

  const randomNumber = Math.floor(Math.random() * eventSounds.length)
  const sound = soundPath + eventSounds[randomNumber]
  startSound(sound)
}

function startSound (sound) {
  const audioDiv = document.querySelector('audio')
  if (audioDiv.src.length !== 0) {
    audioDiv.pause()
  }
  audioDiv.volume = 0.19
  audioDiv.src = sound
  audioDiv.play()
}
function clearEvent () {
  console.log('Fin del evento')

  startAnimation('idle')
  eventList.shift()
  console.log(eventList)
  altasQueueStatus = false
  if (eventList.length > 0) {
    processAltasQueue()
  } else {
    console.log('Final de eventos')
  }
}
