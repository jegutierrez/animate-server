'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const router = require('./router')

const port = process.env.PORT || 8080

const server = http.createServer()
server.listen(port)

server.on('request', router)
server.on('listening', onListening)

function onListening(){
	console.log(`El server esta escuchando el puerto ${port}`)
}