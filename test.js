const { execSync } = require('child_process')

execSync(`ffplay -nodisp -autoexit ${__dirname}/audio.mp3`, 
  {  stdio: 'ignore' })

