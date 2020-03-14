const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controler = require('./controller');

// router.get('/healthcheck', user_controler.healthcheck);
// router.get('/sleep_detail', user_controler.sleep_detail);
// router.get('/user_create', user_controler.user_create);
// router.get('/user_update', user_controler.user_update);
router.get('/user_detail', user_controler.user_detail);
module.exports = router;