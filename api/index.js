const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const Twitter = require('twitter')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser.json())
  app.post(
    '/api/usersShow',
    (req, res) => {
      const option = {
        consumer_key: req.body.consumer_key,
        consumer_secret: req.body.consumer_secret,
        access_token_key: req.body.access_token_key,
        access_token_secret: req.body.access_token_secret,
      }
      try {
        const twitterClient = new Twitter(option)
        twitterClient.get('users/show', {
          user_id: req.body.user_id
        }, (err, data) => {
          if (!err) {
            res.json({
              error: null,
              data
            })
          } else {
            res.status(400).json({
              error: err,
              data: null
            })
          }
        })
      } catch(e) {
        res.status(500).json({
          error: e,
          data: null
        })
      }
    })

  app.post(
    '/api/statusUpdate',
    (req, res) => {
      const option = {
        consumer_key: req.body.consumer_key,
        consumer_secret: req.body.consumer_secret,
        access_token_key: req.body.access_token_key,
        access_token_secret: req.body.access_token_secret,
      }
      try {
        const twitterClient = new Twitter(option)
        twitterClient.post('statuses/update', {
          status: req.body.status
        }, (err, data) => {
          if (!err) {
            res.json({
              error: null,
              data
            })
          } else {
            res.status(400).json({
              error: err,
              data: null
            })
          }
        })
      } catch (e) {
        res.status(500).json({
          error: e,
          data: null
        })
      }
    })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
