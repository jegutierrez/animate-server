const Webrtc2images = require('webrtc2images')
const domify = require('domify')
const io = require('socket.io-client')
const messageTpl = require('./templates/message.hbs')
const uuid = require('uuid')

const socket = io.connect()
const id = uuid.v4()

const rtc = new Webrtc2images({
	width: 200,
	height: 200,
	frames: 10,
	type: 'image/jpeg',
	quiality: 0.4,
	interval: 200
})

rtc.startVideo(function (err) {
   if (err) return logError(err)
})

const messages = document.querySelector('#messages')
const form = document.querySelector('form')

form.addEventListener('submit', function(e){
	e.preventDefault()
	record()
}, false)

socket.on('message', addMessage)

socket.on('messageack', function(message){
	if(message.id === id){
		addMessage(message)
	}
})

function record(){
	const input = document.querySelector('input[name="message"]')
	const message = input.value
	input.value = ''

	rtc.recordVideo(function(err, frames){
		if(err) return logError(err)

		socket.emit('message', {id: id, message: message, frames: frames})
		
	})
}

function addMessage(message){
	const m = messageTpl(message)
	messages.appendChild(domify(m))
}

function logError (err) {
  console.error(err)
}