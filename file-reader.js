const fs = require('fs')

const fileReader = (file) => {
  let fileData
  try {
    fileData = fs.readFileSync(file, 'utf8')
  } catch(err) {
    console.error(err)
  }

  let lines = fileData.split('\n')
  lines = lines.filter((line) => line)
  for (let line  of lines) {
    if(!/\:/.test(line)) {
      console.error(`file ${file} is in the wrong format`)
      return 
    }
  }
  return lines
}

module.exports = fileReader
