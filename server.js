'use strict'

const http = require('http')
const port = process.env.PORT || 8080

const server = http.createServer(function(request, response){
	response.end("Hello iojs")
})

server.listen(port, function(){
	console.log('El server esta escuchando el puerto '+port)
})