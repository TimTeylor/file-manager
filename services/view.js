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
          const coverPath = basePath == '/' ? basePath : basePath + '/'
          arrNames.files.push({
            name: file,
            src: coverPath + file
          })
        }
        
        if(files.length == index + 1) {
          return res.json({
            path: basePath,
            files: arrNames
          })
        }
      })

    })
  },

  search: function(req, res) {
    const fs = require('fs')
    const path = require('path')

    const searchStr = req.query['search']

    const directoryPath = path.join(__dirname, '../assets/')

    const walk = function(dir, done) {
      let results = []
      fs.readdir(dir, function(err, list) {
        if(err) return done(err)
        let i = 0;
        (function next() {
          let file = list[i++]
          if(!file) return done(null, results)
          file = path.resolve(dir, file)
          fs.stat(file, function(err, stat) {
            if(stat && stat.isDirectory()) {
              walk(file, function(err, res) {
                results = results.concat(res)
                next()
              })
            } else {
              const regexp = new RegExp(searchStr, 'g')
              if(file.search(regexp) !== -1) {
                let path = file.split('assets')[1]
                path = path.replace(/\\/g, '/')
                let name = path.split('/')
                name = name[name.length - 1]

                results.push({
                  name,
                  src: path
                })
              }
              next()
            }
          })
        })()
      })
    }

    walk(directoryPath, (err, results) => {
      if(err) throw err
      return res.json({
        files: results
      })
    })
  }

}

module.exports = view