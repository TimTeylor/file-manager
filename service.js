const service = {
  
  getAllFiles: async function() {
    const path = require('path')
    const fs = require('fs')
    const directoryPath = path.join(__dirname, 'assets')
    const arrNamesFiles = []

    fs.readdir(directoryPath, function(err, files) {
      if(err) return console.log('Unable to scan directory: ' + err)
  
      await files.forEach(function (file) {
        arrNamesFiles.push(file)
      })

      await res.json({files: arrNamesFiles})
    })
  }

}

module.exports = service