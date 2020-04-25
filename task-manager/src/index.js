const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.route('/users')
  .post((req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
      res.send(user)
    }).catch((error) => {
      res.status(400).send(error)
    })
  })
  .get((req, res) => {
    User.find({})
      .then((users) => {
        res.send(users)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  })

app.route('/users/:id')
  .get((req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
      if (! user){
        return res.status(404).send()
      }
      res.send(user)
    }).catch((error) => {
      res.status(500).send(error)
    })
  })

app.route('/tasks')
  .post((req, res) => {
    let task = new Task(req.body)
    task.save()
      .then(() => {
        res.status(201).send(task)
      }).catch((error) => {
        res.status(400).send(error)
      })
  })
  .get((req, res) => {
    Task.find({}).then((tasks) => {
      res.send(tasks)
    }).catch((error) => {
      res.status(500).send(error)
    })
  })

app.route('/tasks/:id')
  .get((req, res) => {
    let _id = req.params.id
    Task.findById(_id)
      .then((task) => {
      if (! task) {
        return res.status(404).send()
      }
      res.send(task)
    }).catch((error) => {
      res.status(500).send(error)
    })
  })

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`)
})
