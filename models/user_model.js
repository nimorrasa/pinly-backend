const mongoose = require('mongoose')

module.exports = mongoose.model('Users', mongoose.Schema({
    Pi_Mac: String,
    uid: String,
    end: String,
}),'Users')
