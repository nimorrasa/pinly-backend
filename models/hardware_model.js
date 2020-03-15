const mongoose = require('mongoose')

module.exports = mongoose.model('Hardwares', mongoose.Schema({
    Time_Hr: String,
    Pi_Mac: String,
    Time_Min: String,
    Temp: Number,
    Year: Number,
    Date: Number,
    Heart_Rate: Number,
    Mic : Number,
    Month: Number,
    Sleep_Score_Today : Number
}),'Hardwares');