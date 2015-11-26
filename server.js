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
	let index = path.join(__dirname, 'public', 'index.html')
	response.setHeader('Content-Type', 'text/html')
	let rs = fs.createReadStream(index)
	rs.pipe(response)

	rs.on('error', function(error){
		response.setHeader('Content-Type', 'text/html')
		response.end(error.message)
	})
}

function onListening(){
	console.log(`El server esta escuchando el puerto ${port}`)
}