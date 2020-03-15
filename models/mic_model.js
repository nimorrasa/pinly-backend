const mongoose = require('mongoose')

module.exports = mongoose.model('Mics', mongoose.Schema({
    Time_Hr: String,
    Pi_Mac: String,
    Time_Min: String,
    Year: Number,
    Date: Number,
    Month: Number,
    Mic : Number,
    Hour_num : Number,
}),'Mics');