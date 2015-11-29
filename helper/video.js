'use strict'

const EventEmitter = require('events').EventEmitter

module.exports = function(images){
	let events = new EventEmitter()

	setTimeout(function(){
		events.emit('video', 'test')
	}, 1000)

	return events
}