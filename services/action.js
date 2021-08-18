const action = {

  uploadFile: function(req, res) {

    const filedata = req.file
    if(!filedata) {
      res.status(500).send('Error')
    } else {
      res.writeHead(200, {'Connection': 'close'})
      res.end("That's all folks!")
    }

  }

}

module.exports = action