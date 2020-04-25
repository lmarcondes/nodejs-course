require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete("5ea101b680aea7cf1971fc00").then((task) => {
  if (! task) {
    throw new Error('No Task with that id')
  }
  return Task.countDocuments({completed:false})
}).then((count) => {
  console.log(count)
}).catch((error) => {
  console.log(error)
})
