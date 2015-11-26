'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 8080

const server = http.createServer()
server.listen(port)

server.on('request', onRequest)
server.on('listening', onListening)

function onRequest(request, response){
	let url = request.url
	if (url.startsWith('/index') || url === '/') {
		return serveIndex(response)
	}
	if (url === '/app.js') {
		return serveApp(response)
	}
	response.statusCode = 404
	response.end(`404 not found: ${url}`)
}

function serveIndex(response){
	let index = path.join(__dirname, 'public', 'index.html')
	response.setHeader('Content-Type', 'text/html')
	let rs = fs.createReadStream(index)
	rs.pipe(response)

	rs.on('error', function(error){
		response.setHeader('Content-Type', 'text/plain')
		response.end(error.message)
	})
}

function serveApp(response){
	let app = path.join(__dirname, 'public', 'app.js')
	response.setHeader('Content-Type', 'text/javascript')
	let rs = fs.createReadStream(app)
	rs.pipe(response)

	rs.on('error', function(error){
		response.setHeader('Content-Type', 'text/plain')
		response.end(error.message)
	})
}

function onListening(){
	console.log(`El server esta escuchando el puerto ${port}`)
}