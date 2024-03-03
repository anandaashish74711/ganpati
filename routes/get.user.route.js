const express = require('express')
const router = express.Router()
const { UserInfo } = require('../controllers/User');


router.get('/user/:UserId', getUserInfo);

module.exports = router;
