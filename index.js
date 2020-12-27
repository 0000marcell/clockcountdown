#!/usr/bin/env node
const commandExists = require('command-exists');
const render = require('./renderer')
const clock = require('./clock')
const playSound = require('./play-sound')
const fileReader = require('./file-reader')
const DB = require('./db')
const schema = require('./schema')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

let currentItem = 0

http.listen(3000, () => {
  console.log('listening on *:3000');
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

if(!schema()) {
  console.log('Error creating database!!!') 
  return 
}

const db = new DB()

const saveCompletedTask = async (title, time) => {
  try {
    await db.save(title, time, new Date().toString())
    return true
  } catch(err) {
    console.error(err)  
    return false
  }
} 

const startTheClock = (title, time, timers, infoObj) => {
  clock(time, (min, sec) => {
    infoObj.timer = `${min}:${sec}`
    console.log(infoObj)
    io.emit('timer tick', infoObj)
    //render(title, `${min}:${sec}`)
  }, async () => {
    const response = await saveCompletedTask(title, time)
    if(!response) {
      return
    }
    playSound()
    if(timers.length) {
      let item = timers[0].split(':')
      timers.shift()
      currentItem++
      infoObj.currentItem = currentItem
      startTheClock(item[0], item[1], timers, infoObj)
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

  const timers = fileReader(file)
  if(!timers.length) {
    console.error('you need to create a file with the timers in the right format!');
    return
  }
  currentItem = 0
 
  
  const list = [...timers]
  let item = timers[0].split(':')
  const infoObj = {
    timer: item[1],
    list: list,
    currentItem: currentItem
  }
  timers.shift()
  startTheClock(item[0], item[1], timers, infoObj)
}

run()

