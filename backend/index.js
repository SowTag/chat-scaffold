const express = require('express')
const { WebSocketServer } = require('ws')

const app = express();

app.use(require('cors')({ allow: '*' }))
app.use(require('body-parser').json())

app.get('/servers', (req, res) => {
	console.log('Request at /servers at ' + new Date());

	setTimeout(() => {
		return res.json([{
			name: "asasdnasd " + new Date().getTime()
		}])
	}, 1500)
})

const wss = new WebSocketServer({
	port: 3001
});

app.listen(5172, () => {
	console.log("App launched :5172")
})