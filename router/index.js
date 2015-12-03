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

function onRequest(req, res){
  if(req.url.startsWith('/socket.io')) return

	mount(req, res, function(error){
		if(error) return fail(error, res)

		router(req, res, function(error){
			if(error) return fail(error, res)
		 res.statusCode = 404
		 res.end(`Not found ${req.url}`)
		})
	})
}

function fail(err, res){
	res.statusCode = 500
	res.setHeader('Content-Type', 'text/plain')
	res.end(err.message)
}

module.exports = onRequest