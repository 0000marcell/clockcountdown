#!/usr/bin/env node
const figlet = require('node-figlet')
const { execSync } = require('child_process')
const commandExists = require('command-exists');

const run = async () => {
  try {
    await commandExists('ffplay') 
  } catch(err) {
    console.error(`if you want to listen to a audio queue when the clock stops install ffplay`)  
  }

  let min = process.argv[2] || 30
  let sec = '00'
  const interval = setInterval(() => {
    if (sec === '00'){
      sec = '59'
      if (min === '00') {
        execSync(`ffplay ./audio.mp3`)
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
    figlet(`${min}:${sec}`,[""], function (ascii){
      console.clear()
      console.log(`${ascii}`)
    });
  }, 1000)
}

run()

