const path = require('path')
const fs = require('fs')

const action = {

  uploadFile: function(req, res) {

    let file = req.files.file

    file.mv(path.join(__dirname, '../assets/') + req.body.filename, err => {
      if(err) {
        return res.status(500).send(err)
      }
      res.writeHead(200, {'Connection': 'close'})
      res.end("That's all folks!")
    })

  }

}

module.exports = action