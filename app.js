const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const port = 5000

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
//   res.header("Access-Control-Allow-Credentials", true)
//   // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

//   // res.header("Access-Control-Allow-Origin", '*');
  
//   next();
//   // if (req.method === "OPTIONS") {
// 		// res.end('');
// 	// } else {
// 	// }
// })

const view = require('./services/view')
const action = require('./services/action')

app.get('/api', view.getAllFiles)
app.post('/api/upload', action.uploadFile)

app.use('/api/static', express.static('assets'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})