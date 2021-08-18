const express = require('express')
const app = express()
const port = 5000

const view = require('./services/view')
const action = require('./services/action')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Content-Type", "application/json")
  res.header("Content-Type", "form/multipart")
  next()
})

app.get('/api', view.getAllFiles)
app.post('/api/upload', action.uploadFile)

app.use('/api/static', express.static('assets'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})