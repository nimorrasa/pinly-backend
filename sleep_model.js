const mongoose = require('mongoose')

module.exports = mongoose.model('sleep_test', mongoose.Schema({
    Time_Hr: String,
    Pi_Mac: String,
    Time_Min: String,
    Temp: String,
    Year: String,
    Date: String,
    Mic: String,
    Heart_Rate: String,
    Month: String,
    Current_sleep_Time : String,
    Recent_sleep_Time : String,
    Recent_WakeUp_Time : String,
    Sleep_Score_Today : String,
    Sleep_Score_Weekly : String
}))
