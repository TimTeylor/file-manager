const fs = require('fs')
const path = require('path')

const action = {

  uploadFile: function(req, res) {

    const filedata = req.file
    if(!filedata) {
      res.status(500).send('Error')
    } else {
      res.writeHead(200, {'Connection': 'close'})
      res.end("That's all folks!")
    }

  },

  createFolder: function(req, res) {

    const folderName = req.body.name
    let basePath = req.query['path'] ? `${req.query['path']}` : '/'

    fs.mkdir(path.join(__dirname, '../assets' + basePath + '/' + folderName), function(err) {
      if(err) res.status(500).send(err)
      else {
        res.writeHead(202, {'Connection': 'close'})
        res.end("That's all folks!")
      }
    })

  }

}

module.exports = action