const action = {

  uploadFile: function(req, res) {

    const filedata = req.file
    if(!filedata) {
      res.status(400)
      res.send('Error')
    } else {
      res.code(200)
      res.send('Done')
    }

  }

}

module.exports = action