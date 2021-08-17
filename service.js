const service = {
  
  getAllFiles: function(req, res) {
    const path = require('path')
    const fs = require('fs')
    const directoryPath = path.join(__dirname, 'assets')
    const arrNamesFiles = []

    fs.readdir(directoryPath, function(err, files) {
      if(err) return console.log('Unable to scan directory: ' + err)
  
      files.forEach(function (file, index) {
        arrNamesFiles.push(file)
        if(files.length == index + 1) return res.json({files: arrNamesFiles})
      })

    })
  }

}

module.exports = service