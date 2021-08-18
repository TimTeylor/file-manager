const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()

const port = 5000

app.use(cors())
app.use(multer({dest:'assets'}).single('filedata'))
app.use('/api/static', express.static('assets'))


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
})

const view = require('./services/view')
const action = require('./services/action')

app.get('/api', view.getAllFiles)
app.post('/api/upload', action.uploadFile)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})