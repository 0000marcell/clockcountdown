#!/usr/bin/env node
const commandExists = require('command-exists');
const render = require('./renderer')
const clock = require('./clock')
const playSound = require('./play-sound')
const fileReader = require('./file-reader')

const startTheClock = (title, time, clocks) => {
  clock(time, (min, sec) => {
    render(title, `${min}:${sec}`)
  }, () => {
    playSound()
    if(clocks.length) {
      let item = clocks[0].split(':')
      clocks.shift()
      startTheClock(item[0], item[1], clocks)
      return
    }
    console.log('All tasks finished')
  })
} 

const run = async () => {
  try {
    await commandExists('ffplay') 
  } catch(err) {
    console.error(`if you want to listen to a audio queue when the clock stops install ffplay`)  
  }

  let file = process.argv[2]
  if(!file) {
    console.error('You need to pass a json file to execute');
    return 
  }

  clocks= fileReader(file)
  if(!clocks.length) {
    console.error('you need to create a file with the clocks in the right format!');
    return
  }
  let item = clocks[0].split(':')
  clocks.shift()
  startTheClock(item[0], item[1], clocks)
}

run()

