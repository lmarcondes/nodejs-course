const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.route('/users')
  .post( async (req, res) => {
    let user = new User(req.body)

    try {
      await user.save()
      res.status(201).send(user)
    } catch (e) {
      res.status(400).send(e)
    }
  })
  .get(async (req, res) => {
    try {
      const users = await User.find({})
      res.send(users)
    } catch (e) {
      res.status(500).send(e)
    }
  })

app.route('/users/:id')
  .get(async (req, res) => {
    const _id = req.params.id
    try {
      const user = await User.findById(_id)
      res.status(201).send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  .patch(async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
      if (! user) {
      res.status(404).send()
    }

    res.status(201).send(user)
  } catch (e) {
    res.send(400).send(e)
  }
  })

app.route('/tasks')
  .post(async (req, res) => {
    let task = new Task(req.body)
    try {
      await task.save()
      res.send(201).send(task)
    } catch (e) {
      res.status(400).send(e)
    }
  })
  .get(async (req, res) => {
    try {
      const tasks = await Task.find({})
      res.status(201).send(tasks)
    } catch (e) {
      res.status(500).send(e)
    }
  })

app.route('/tasks/:id')
  .get( async (req, res) => {
    let _id = req.params.id
    try {
      const task = await Task.findById(_id)
      res.status(201).send(task)
    } catch (error) {
      res.status(404).send(error)
    }
  })

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`)
})
