const { spawn } = require('child_process')

const figlet = (text, opts) => {
  const fig = spawn("figlet", [...opts.split(' '), text])
  fig.stdout.on('data', function (data) {
    console.log(data.toString('utf8'))
  });
} 

const render = (title, clock) => {
  let font = 'o8'
  figlet(title.toUpperCase(), `-f term -c -t`) 
  figlet(clock, `-f ${font} -c -t`) 
  console.clear()
}

module.exports = render 
