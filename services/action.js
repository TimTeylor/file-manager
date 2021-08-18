const BusBoy = require('busboy')
const path = require('path')
const fs = require('fs')

const action = {

  uploadFile: function(req, res) {

    const busboy = new BusBoy({headers: req.headers})

    busboy.on('file', function(file, filename) {
      const saveTo = path.join(__dirname, '../assets/' + filename)
      file.pipe(fs.createWriteStream(saveTo))
    })

    busboy.on('finish', function() {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        'Connection': 'close'
      })
      res.end("That's all folks!")
    })
    
    return req.pipe(busboy)

  }

}

module.exports = action