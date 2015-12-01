'use strict'

const path = require('path')
const course = require('course')
const st = require('st')
const jsonBody = require('body/json')
const helper = require('../helper')

const router = course()
const mount = st({
	path: path.join(__dirname, '..', 'public'),
	index: 'index.html',
	passThrough: true
})

router.post('/process', function (req, res) {
  jsonBody(req, res, { limit: 3 * 1024 * 1024 }, function (err, body) {
    if (err) return fail(err, res)

    if (Array.isArray(body.images)) {
      let converter = helper.convertVideo(body.images)

      converter.on('log', function (msg) {
        console.log(msg)
      })

      converter.on('video', function (video) {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ video: video }))
      })

    } else {
      res.statusCode = 500
      res.end(JSON.stringify({ error: 'parameter `images` is required' }))
    }

  })
})

function onRequest(request, response){
	mount(request, response, function(error){
		if(error) return fail(error, response)

		router(request, response, function(error){
			if(error) return fail(error, response)
			response.statusCode = 404
			response.end(`Not found ${request.url}`)
		})
	})
}

function fail(err, res){
	res.statusCode = 500
	res.setHeader('Content-Type', 'text/plain')
	res.end(err.message)
}

module.exports = onRequest