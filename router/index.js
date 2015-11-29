const path = require('path')
const course = require('course')
const st = require('st')

const router = course()
const mount = st({
	path: path.join(__dirname, '..', 'public'),
	index: 'index.html',
	passThrough: true
})

function onRequest(request, response){
	mount(request, response, function(error){
		if(error) return fail(error, response)

		router(request, response, function(error){
			if(error) return fail(error, response)
			response.statusCode = 404
			response.end(`Not found ${request.url}`)
		})
	})
}

module.exports = onRequest