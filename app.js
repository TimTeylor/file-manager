const express = require('express')
const app = express()
const port = 5000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Content-Type", "application/json")
  next()
})

app.get('/api', function(req, res) {
  const path = require('path')
  const fs = require('fs')
  const directoryPath = path.join(__dirname, 'assets')
  const directoryFiles = []

  fs.readdir(directoryPath, function(err, files) {
    if(err) return console.log('Unable to scan directory: ' + err)

    files.forEach(function (file) {
      directoryFiles.push(file)
    })
  })
  res.json({files: directoryFiles})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})