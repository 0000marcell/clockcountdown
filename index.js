#!/usr/bin/env node
const commandExists = require('command-exists');
const render = require('renderer')

const run = async () => {
  try {
    await commandExists('ffplay') 
  } catch(err) {
    console.error(`if you want to listen to a audio queue when the clock stops install ffplay`)  
  }
}

run()

