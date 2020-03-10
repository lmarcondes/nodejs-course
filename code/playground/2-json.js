const fs = require('fs')

let stringData = fs.readFileSync('1-json.json').toString()
let dataJSON = JSON.parse(stringData)

dataJSON.age = 24
dataJSON.name = "Lucas"

console.log(dataJSON)
fs.writeFileSync('2-json.json', JSON.stringify(dataJSON))