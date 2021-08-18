const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const port = 5000

const view = require('./services/view')
const action = require('./services/action')

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS')
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

app.get('/api', view.getAllFiles)
app.post('/api/upload', action.uploadFile)

app.use('/api/static', express.static('assets'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})