const { mkdir, unlink, rm, rename } = require('fs')
const path = require('path')

const action = {
  moveTo: function (req, res) {
    const fileName = req.body.name
    const currentPath = path.join(__dirname, '../assets/', req.body.oldPath)
    const newPath = path.join(__dirname, '../assets/', req.body.newPath, fileName)

    rename(currentPath, newPath, err => {
      if (err) res.status(500).send('Error')
      res.writeHead(200, {'Connection': 'close'})
      res.end("Done!")
    })
  },

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

    mkdir(path.join(__dirname, '../assets' + basePath + '/' + folderName), function(err) {
      if(err) res.status(500).send(err)
      else {
        res.writeHead(202, {'Connection': 'close'})
        res.end("That's all folks!")
      }
    })

  },

  delete: function(req, res) {
    const name = req.body.fullPath
    const pathJoin = path.join(__dirname, '../assets' + name)

    if(name.split('.').length > 1) {
      unlink(pathJoin, err => {
        if(err) return res.status(500).send(err)

        res.writeHead(200, {'Connection': 'close'})
        res.end("File delete")
      })
    } else {
      rm(pathJoin, { recursive: true }, err => {
        if(err) return res.status(500).send(err)

        res.writeHead(200, {'Connection': 'close'})
        res.end("Folder delete")
      })
    }
  }

}

module.exports = action