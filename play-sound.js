const { execSync } = require('child_process')

const playSound = () => {
  execSync(`ffplay -nodisp -autoexit ${__dirname}/audio.mp3`, 
    {  stdio: 'ignore' })
}

playSound()

module.exports = playSound
