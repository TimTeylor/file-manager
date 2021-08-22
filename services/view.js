const view = {
  
  getAllFiles: function(req, res) {
    const path = require('path')
    const fs = require('fs')

    let basePath = req.query['path'] ? `${req.query['path']}` : '/'

    const directoryPath = path.join(__dirname, '../assets' + basePath)
    const arrNames = {
      folders: [],
      files: []
    }

    fs.readdir(directoryPath, function(err, files) {
      if(err) return console.log('Unable to scan directory: ' + err)

      if(files.length == 0) {
        return res.json({
          path: basePath,
          files: []
        })
      }
  
      files.forEach(function (file, index) {
        if(file.split('.').length == 1) {
          arrNames.folders.push(file)
        } else {
          arrNames.files.push(file)
        }
        
        if(files.length == index + 1) {
          return res.json({
            path: basePath,
            files: arrNames
          })
        }
      })

    })
  }

}

module.exports = view