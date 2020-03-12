//models.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@pinlytest1-u7gsk.gcp.mongodb.net/test?retryWrites=true&w=majority`;


console.log(uri);
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;
mongoose.connect(uri,options).then(
    ()=>{console.log("connected")},
    err =>{console.log("err",err);}
);
// =======
// Schemas
// =======

const userSchema = mongoose.Schema({
    Pi_Mac: String,
    uid: String,
    end: String,
})
  
module.exports = mongoose.model(`${process.env.DB_DATABASE}`,userSchema);