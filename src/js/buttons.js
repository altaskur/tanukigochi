
const actionButtons = document.querySelectorAll('button.button')

actionButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.textContent)

    if (button.textContent === '💖') {
      // eslint-disable-next-line
      changeStatus('happiness', 5)
      // eslint-disable-next-line
      console.log(tanukiStatus.happiness)
      // eslint-disable-next-line
      onNewEvent('happiness')
    }
    if (button.textContent === '🍒') {
      let eventType = 'annoyance'
      // eslint-disable-next-line
      if (tanukiStatus.hungry < 90) {
        // eslint-disable-next-line
        changeStatus('hungry', 5)
        eventType = 'hungry'
      }
      console.log(eventType)
      // eslint-disable-next-line
      console.log(tanukiStatus.hungry)
      // eslint-disable-next-line
      onNewEvent(eventType)
    }

    if (button.textContent === '💤') {
      // eslint-disable-next-line
      changeStatus('sleep', -5)
      // eslint-disable-next-line
      console.log(tanukiStatus.sleep)
      // eslint-disable-next-line
      onNewEvent('sleep')
    }
  })
})
