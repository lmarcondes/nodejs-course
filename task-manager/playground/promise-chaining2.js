require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete("5ea101b680aea7cf1971fc00").then((task) => {
//   if (! task) {
//     throw new Error('No Task with that id')
//   }
//   return Task.countDocuments({completed:false})
// }).then((count) => {
//   console.log(count)
// }).catch((error) => {
//   console.log(error)
// })

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id).then((result) => {console.log(result)})
  const count = await Task.countDocuments({completed:false})
  return count
}

const taskId = "5efe75d5fd5f91885de72c02"

deleteTaskAndCount(taskId).then((count) => {
  console.log(count)
}).catch((error) => {
  console.log(error)
})
