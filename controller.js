const mongoose = require('mongoose')
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@pinlytest1-u7gsk.gcp.mongodb.net/test?retryWrites=true&w=majority`;

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

const sleep_model = require('./sleep_model');
const user_model = require('./user_model');

exports.sleep_detail = async function (req, res) {
    const { params } = req;
    const filter = { Pi_Mac: req.query.mac_address };
    try{
        let doc = await sleep_model.findOne(filter);
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