const action = {

  uploadFile: function(req, res) {

    const filedata = req.file
    if(!filedata) res.send('Error')
    else res.send('Done')

  }

}

module.exports = action