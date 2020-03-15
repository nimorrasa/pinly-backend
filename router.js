const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controler = require('./controller');

//Healthcheck Server
router.get('/healthcheck', user_controler.healthcheck);

//Get Value from Hardware
router.get('/sleep_detail', user_controler.sleep_detail);

//Create user with Mac Address
router.get('/user_create', user_controler.user_create);
//Update Mac Address
router.get('/user_update', user_controler.user_update);

router.get('/sleep_log',user_controler.sleep_log);
router.get('/sleep_log_weekly',user_controler.sleep_log_weekly);

router.get('/sleep_score_weekly',user_controler.sleep_score_weekly);

router.get('/mic_summary',user_controler.mic_summary);

module.exports = router;