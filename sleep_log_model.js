const mongoose = require('mongoose')

module.exports = mongoose.model('sleep_logs', mongoose.Schema({
    Pi_Mac: String,
    uid: String,
    Time_Hr: String,
    Time_Min: String,
    Sleep_Status: Number,
    Timestamp : Date
}),'sleep_logs');