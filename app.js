const express = require('express')
const app = express()
const port = 5000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Content-Type", "application/json")
  next()
})

app.get('/', function(req, res) {
  res.send('Hello')
  // res.send(`${__dirname}/assets/melina-kiefer-E983H8H1zuo-unsplash.jpg`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})