'use strict'

const socketio = require('socket.io')
const helper = require('../helper')
const database = require('../database')

module.exports = function(server){
	const io = socketio(server)
	const db = database()

	io.on('connection', onConnection)

	function onConnection(socket){
		console.log(`Client Connected ${socket.id}`)

		socket.on('message', function(message){
			const converter = helper.convertVideo(message.frames)

			converter.on('log', console.log)

			converter.on('video', function(video){
				delete message.frames
				message.video = video

				//save message
				db.save(message, function(err){})

				socket.broadcast.emit('message', message)
				socket.emit('messageack', message)
			})
		})
	}
}