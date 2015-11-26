const path = require('path')
const st = require('st')

const mount = st({
	path: path.join(__dirname, '..', 'public'),
	index: 'index.html'
})

function onRequest(request, response){
	mount(request, response, function(error){
		if(error) return response.end(error.message)

		response.statusCode = 404
		response.end(`Not found ${request.url}`)
	})
}

module.exports = onRequest