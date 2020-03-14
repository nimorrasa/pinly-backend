const mongoose = require('mongoose')

module.exports = mongoose.model('test_users', mongoose.Schema({
    Pi_Mac: String,
    uid: String,
    end: String,
}),'test_users')
