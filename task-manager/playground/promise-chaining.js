require('../src/db/mongoose')
const User = require('../src/models/user')

//5e9fbda21b6bd2b0ba056873

// User.findOneAndUpdate('5e9fbda21b6bd2b0ba056873', {age:1}).then((user) => {
//   console.log(user)
//   return User.countDocuments({age:1})
// }).then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })

const updateAgentAndCount = async (id,age) => {
  const user = await User.findOneAndUpdate(id, {age})
  const count = await User.countDocuments({age})

  return count
}

const userId = "5efe75b6fd5f91885de72c01"

updateAgentAndCount(userId, 1).then((count) => {
  console.log(count)
}).catch((error) => {
  console.log(error)
})
