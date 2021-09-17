const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()

const port = 5000

app.use(cors())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    const basePath = req.query['path'] ? `assets/${req.query['path']}` : 'assets/'
    cb(null, basePath)
  },
  filename: function (req, file, cb) {
    let ext = ''
    if (file.originalname.split(".").length > 1) {
      ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
    }

    cb(null, file.originalname.split('.')[0] + ext)
  }
})
const upload = multer({storage: storage})

app.use(express.json())
app.use('/api/assets', express.static('assets'))

const view = require('./services/view')
const action = require('./services/action')

app.get('/api', view.getAllFiles)
app.get('/api/search', view.search)
app.post('/api/upload', upload.single('filedata'), action.uploadFile)
app.get('/api/folder/all', view.getAllFolders)
app.post('/api/folder/create', action.createFolder)
app.delete('/api/delete', action.delete)
app.post('/api/move', action.moveTo)
app.post('/api/rename', action.renameFile)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})