const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer');

const avatar = multer({dest: 'images/avatar/'});

const router = new express.Router();

router.route('/users')
  .post(async (req, res) => {
    const user = new User(req.body)
    try {
      await user.save()
      let token = await user.generateAuthToken()
      res.status(201).send({user, token})
    } catch (e) {
      res.status(400).send(e)
    }
  })

router.route('/users/login')
  .post(async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({user, token})
    } catch (e) {
      res.status(400).send(e)
    }
  })

router.route('/users/logout')
  .post(auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
      })
      await req.user.save()
      res.send()
    } catch (e) {
      res.status(500).send()
    }
  })

router.route('/users/logoutAll')
  .post(auth, async (req, res) => {
    try {
      req.user.tokens = []
      await req.user.save()
      res.send()
    } catch (e) {
      res.status(500).send()
    }
  })

router.route('/users/me')
  .get(auth, async (req, res) => {
    res.send(req.user)
  })
  .patch(auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)
    )
    if (!isValidOperation) {
      return res.status(400).send({error: 'Invalid Updates'})
    }
    try {
      updates.forEach(update => {req.user[update] = req.body[update]})
      await req.user.save()
      res.status(201).send(req.user)
    } catch (e) {
      res.status(400).send(e)
    }
  })
  .delete(auth, async (req, res) => {
    try {
      await req.user.remove()
      res.send(req.user)
    } catch (error) {
      res.status(500).send(error)
    }
  })

router.route('/users/me/avatar')
  .post(avatar.single('avatar'), (req, res) => {
    res.send()
  })

module.exports = router
