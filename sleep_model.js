const mongoose = require('mongoose')

module.exports = mongoose.model('test', mongoose.Schema({
    Time_Hr: String,
    Pi_Mac: String,
    Time_Min: String,
    Temp: Number,
    Year: Number,
    Date: Number,
    Heart_Rate: Number,
    Mic : Number,
    Month: Number,
    Current_sleep_Time : Number,
    Recent_sleep_Time : Number,
    Recent_WakeUp_Time : Number,
    Sleep_Score_Today : Number,
    Sleep_Score_Weekly : Number
}),'test');