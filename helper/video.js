'use strict'

const EventEmitter = require('events').EventEmitter
const async = require('async')

module.exports = function(images){
	let events = new EventEmitter()

	async.series([
		decodeImages,
		createVideo,
		encodeVideo,
		cleanup
	], convertFinished)

	function decodeImages(done){
		done()
	}

	function createVideo(done){
		done()
	}

	function encodeVideo(done){
		done()
	}

	function cleanup(done){
		done()
	}

	function convertFinished(err){
		setTimeout(function(){
			events.emit('video', 'test')
		}, 1000)
	}


	return events
}