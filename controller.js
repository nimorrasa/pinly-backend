const mongoose = require('mongoose')
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@pinlytest1-u7gsk.gcp.mongodb.net/Test_Stable?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect(uri, options);

const hardware_model = require('./models/hardware_model');
const mic_model = require('./models/mic_model');
const user_model = require('./models/user_model');
const sleep_log_model = require('./models/log_model');

exports.sleep_detail = async function (req, res) {
    const { params } = req;
    const filter = { Pi_Mac: req.query.mac_address };
    try{
        let doc = await hardware_model.findOne(filter);
        res.json({
            message: 'success',
            doc
        });
    }catch(err) {
        res.json({
            message: 'error',
            err
        })
    }


}

exports.healthcheck = function (req, res) {
    res.json({
        message : "Success"
    })
}

exports.user_create = async function (req, res) {
    const filter = { uid: req.query.uid };

    try{
        let doc = await user_model.findOne(filter);

        if(doc != null) return res.json({
            message: 'Duplicate Data',
            doc
        })

        var person = new user_model({
            Pi_Mac : req.query.mac_address,
            uid : req.query.uid,
            end : ","
        })
        const result = await person.save()
        res.json({
            message: 'success',
            result
        })
    }catch(err) {
        res.json({
            message: 'error',
            err
        })
    }

};

exports.user_update = async function (req, res) {

    try{
        const filter = { uid: req.query.uid };
        const update = { Pi_Mac: req.query.mac_address };

        let doc = await user_model.findOne(filter);

        if(doc == null) {
            var person = new user_model({
                Pi_Mac : req.query.mac_address,
                uid : req.query.uid,
                end : ","
            })
            const result = await person.save()
        }else{
            await user_model.updateOne(filter, update);
        }

        res.json({
            message: 'success',
            doc
        })
    }catch(err) {
        res.json({
            message: 'error',
            err
        })
    }

};

exports.user_detail = async function (req, res) {

    try{
        const filter = { uid: req.query.uid };
        let doc = await user_model.findOne(filter);
        res.json({
            message: 'success',
            doc
        })
    }catch(err) {
        res.json({
            message: 'error',
            err
        })
    }

};


exports.sleep_log = async function (req, res) {

    const timestamp = new Date(req.query.timestamp);
    console.log(timestamp);
    const time_hr = timestamp.getHours();
    const time_min = timestamp.getMinutes();
    const pi_mac = req.query.mac_address;
    const uid = req.query.uid;
    const sleep_status =req.query.status;

    try{
        const log_data = new sleep_log_model({
            Pi_Mac: pi_mac,
            uid: uid,
            Time_Hr: time_hr,
            Time_Min: time_min,
            Sleep_Status: sleep_status,
            Timestamp : timestamp
        });
        await log_data.save();
        res.json({
            message: 'success'
        })
    }catch(err) {
        res.json({
            message: 'error',
            err
        })
    }
}

exports.sleep_log_weekly = async function (req, res) {
    var date_start = new Date();
    date_start.setHours(00,00,00)
    date_start.setDate(date_start.getDate() - 7)
    var date_end = new Date();
    date_end.setHours(23,59,59);
    date_end.setDate(date_end.getDate())
    
    try{
        const filter = { Pi_Mac: req.query.mac_address, Timestamp: { $gte: date_start, $lte: date_end} };
        let doc = await sleep_log_model.find(filter);
        res.json({
            message: 'success',
            doc
        })
    }catch(err) {
        res.json({
            message: 'error',
            err
        })
    }

}


exports.sleep_score_weekly = async function (req, res) {
    var date_start = new Date();
    date_start.setHours(00,00,00)
    date_start.setDate(date_start.getDate() - 7)
    const start_date = date_start.getDate();
    const start_month = date_start.getMonth();
    const start_year = date_start.getFullYear();
    
    var date_end = new Date();
    date_end.setHours(23,59,59);
    date_end.setDate(date_end.getDate())
    const end_date = date_end.getDate();
    const end_month = date_end.getMonth();

    try{
        const filter = { 
            Pi_Mac: req.query.mac_address,
            Year: {
                $gte: start_year,
            },
            Date: {
                $gte: start_date,
                $lte: end_date
            },
            Month: {
                $gte: start_month,
                $lte: end_month
            },
        };
        let doc = await hardware_model.find(filter);
        res.json({
            message: 'success',
            doc
        })
    }catch(err) {
        res.json({
            message: 'error',
            err
        })
    }

}