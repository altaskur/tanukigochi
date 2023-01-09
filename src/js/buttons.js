
const actionButtons = document.querySelectorAll('button.button')

actionButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.textContent)
    if (button.textContent === '💖') {
      changeStatus('happiness', 5)
      console.log(tanukiStatus.happiness)
    }
    if (button.textContent === '🍒') {
      changeStatus('hungry', 5)
      console.log(tanukiStatus.hungry)
    }
    if (button.textContent === '💤') {
      changeStatus('sleep', -5)
      console.log(tanukiStatus.sleep)
    }
  })
})
