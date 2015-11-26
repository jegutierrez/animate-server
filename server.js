'use strict'

const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 8080

const server = http.createServer()
server.listen(port)

server.on('request', onRequest)
server.on('listening', onListening)

function onRequest(request, response){
	let file = fs.readFileSync('public/index.html')
	response.end(file)
}

function onListening(){
	console.log('El server esta escuchando el puerto '+port)
}