const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Content-Type", "application/json")
  next()
})

app.get('/api/manager', function(req, res) {
  // res.sendFile('./assets/vera-gorbunova-fGQ4l-0fjbE-unsplash.jpg')
  res.send(`${__dirname}/assets/vera-gorbunova-fGQ4l-0fjbE-unsplash.jpg`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})