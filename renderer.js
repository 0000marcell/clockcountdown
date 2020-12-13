const figlet = require('node-figlet')

const render = (str) => {
  figlet(str,[""], function (ascii){
    console.clear()
    console.log(`${ascii}`)
  });
} 

module.exports = render 

//export default print
