'use strict'

const fs = require('fs')
const path = require('path')
const EventEmitter = require('events').EventEmitter
const async = require('async')
const dataUriBuffer = require('data-uri-to-buffer')
const os = require('os')
const uuid = require('uuid');
const concat = require('concat-stream')
const listFiles = require('./list')
const ffmpeg = require('./ffmpeg')

module.exports = function(images){
	let events = new EventEmitter()
	let count = 0
	let baseName = uuid.v4()
	let tmpDir = os.tmpDir()
	let video

	async.series([
		decodeImages,
		createVideo,
		encodeVideo,
		//cleanup
	], convertFinished)

	function decodeImages(done){
		async.eachSeries(images, decodeImage, done)
	}

	function decodeImage(image, done){
		let fileName = `${baseName}-${count++}.jpg`
		let buffer = dataUriBuffer(image)
		let ws = fs.createWriteStream(path.join(tmpDir, fileName))

		ws.on('error', done)
     	  .end(buffer, done)

    	events.emit('log', `Converting ${fileName}`)
	}

	function createVideo(done){
	    events.emit('log', 'Creating video')
	    ffmpeg({
	      baseName: baseName,
	      folder: tmpDir
	    }, done)
	}

	function encodeVideo(done){
	    let fileName = `${baseName}.webm`
	    let rs = fs.createReadStream(path.join(tmpDir, fileName))
	
	    events.emit('log', `Encoding video ${fileName}`)
	
	    rs.pipe(concat(function (videoBuffer) {
	      video = `data:video/webm;base64,${videoBuffer.toString('base64')}`
	      done()
	    }))
	
	    rs.on('error', done)
	}

	function cleanup(done){
		events.emit('log', 'Cleanning up')

		listFiles(tmpDir, baseName, function(err, files){
			if(err) return done(err)

			deleteFiles(files, done)
		})
	}

	function deleteFiles(files, done){
		async.each(files, deleteFile, done)
	}

	function deleteFile(file, done){
		events.emit('log', `Deleting ${file}`)
		fs.unlink(path.join(tmpDir, file), function(err){
			//ignore errors
			done()
		})
	}

	function convertFinished(err){
		if (err) return events.emit('error', err)
		events.emit('video', video)
	}


	return events
}