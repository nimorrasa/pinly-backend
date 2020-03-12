// const user = require('./model');
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


exports.sleep_detail = function (req, res) {
    const { params } = req

    mongoose.collection('test').findOne({Pi_mac : params.mac_address}, function(err, result) {
        if (err) throw err;
        res.json({
          message: 'Success',
          result
        })
    })
}

const UserModel = mongoose.model("test_users", {
    Pi_Mac: String,
    uid: String,
    end: String
}); 

exports.healthcheck = function (req, res) {
    res.json({
        message : "Success"
    })
}

exports.user_create = async function (req, res) {
    const filter = { uid: req.query.uid };

    try{
        let doc = await UserModel.findOne(filter);

        if(doc != null) return res.json({
            message: 'Duplicate Data',
            doc
        })

        var person = new UserModel({
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

        let doc = await UserModel.findOne(filter);
        await UserModel.updateOne(filter, update);
        
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