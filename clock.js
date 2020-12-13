const playSound = require('playSound')

const clock = () => {
  let min = process.argv[2] || 30
  let sec = '00'
  const interval = setInterval(() => {
    if (sec === '00'){
      sec = '59'
      if (min === '00') {
        playSound() 
        console.log('time over')
        clearInterval(interval)
        return
      }
      min = parseInt(min) - 1 
      if (min < 10){
        min = `0${min}` 
      }
    } else {
      sec = parseInt(sec) - 1
      if (sec < 10){
        sec = `0${sec}` 
      }
    }
    render(`${min}:${sec}`)
  }, 1000)
} 

module.exports = clock
