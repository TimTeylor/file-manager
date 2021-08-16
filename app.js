const express = require('express')
const app = express()
const port = 5000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Content-Type", "application/json")
  next()
})

app.get('/api', function(req, res) {
  res.json({a: '1'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})