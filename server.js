
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config();

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@pinlytest1-u7gsk.gcp.mongodb.net/test?retryWrites=true&w=majority`;

app.get('/hello/:message', (req, res) => {
    const { params } = req
  
    res.json({
      message: 'Ahoy!',
      params
    })
})

app.get('/graph_data/:uid', (req, res) => {
    const { params } = req

    mongoose.connect(uri, options, function(err, db) {
        if (err) throw err;
        db.collection(`${process.env.DB_DATABASE}`).findOne({}, function(err, result) {
          if (err) throw err;
          res.json({
            message: 'Success',
            result
          })
          db.close();
        })
      })
})

app.get('/hello/:message', (req, res) => {
    const { params } = req
  
    res.json({
      message: 'Ahoy!',
      params
    })
})

app.listen(5000, () => {
  console.log('Start server at port 5000.')
})