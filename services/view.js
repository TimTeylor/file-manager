const { readdir, readdirSync, stat, statSync } = require('fs')
const path = require('path')

const view = {

  getAllFolders: function(req, res) {
    const directoryPath = path.join(__dirname, '../assets/')
    let folders = []

    function ThroughDirectory(Directory) {
      readdirSync(Directory).forEach(File => {

        const Absolute = path.join(Directory, File)
        if (statSync(Absolute).isDirectory()) {
          let normalyPath = Absolute.split('assets')
          normalyPath = normalyPath[1].replace(/\\/g, '/')
          folders.push(normalyPath)
          return ThroughDirectory(Absolute)
        }

      });
    }
  
    ThroughDirectory(directoryPath)
    return res.json({folders})
  },
  
  getAllFiles: function(req, res) {

    let basePath = req.query['path'] ? `${req.query['path']}` : '/'

    const directoryPath = path.join(__dirname, '../assets' + basePath)
    const arrNames = {
      folders: [],
      files: []
    }

    readdir(directoryPath, function(err, files) {
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

    const searchStr = req.query['search']

    const directoryPath = path.join(__dirname, '../assets/')

    const walk = function(dir, done) {
      let results = []
      readdir(dir, function(err, list) {
        if(err) return done(err)
        let i = 0;
        (function next() {
          let file = list[i++]
          if(!file) return done(null, results)
          file = path.resolve(dir, file)
          stat(file, function(err, stat) {
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