'use strict'

const http = require('http')
const port = process.env.PORT || 8080

const server = http.createServer()
server.listen(port)

server.on('request', onRequest)
server.on('listening', onListening)

function onRequest(request, response){
	response.end("Hello iojs")
}

function onListening(){
	console.log('El server esta escuchando el puerto '+port)
}