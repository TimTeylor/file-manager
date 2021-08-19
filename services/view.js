const view = {
  
  getAllFiles: function(req, res) {
    const path = require('path')
    const fs = require('fs')
    const directoryPath = path.join(__dirname, '../assets')
    const arrNames = {
      folders: [],
      files: []
    }

    fs.readdir(directoryPath, function(err, files) {
      if(err) return console.log('Unable to scan directory: ' + err)

      if(files.length == 0) {
        res.writeHead(200, {'Connection': 'close'})
        return res.end("Directory is empty")
      }
  
      files.forEach(function (file, index) {
        if(file.split('.').length == 1) {
          arrNames.folders.push(file)
        } else {
          arrNames.files.push(file)
        }
        
        if(files.length == index + 1) return res.json({files: arrNames})
      })

    })
  }

}

module.exports = view