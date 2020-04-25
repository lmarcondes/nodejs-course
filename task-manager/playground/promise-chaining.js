require('../src/db/mongoose')
const User = require('../src/models/user')

//5e9fbda21b6bd2b0ba056873

User.findOneAndUpdate('5e9fbda21b6bd2b0ba056873', {age:1}).then((user) => {
  console.log(user)
  return User.countDocuments({age:1})
}).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})
