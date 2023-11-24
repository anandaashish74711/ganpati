const express = require('express')
const router = express.Router()
const { addUserInfo , getallUsers,getUserInfoById} = require('../controllers/userInfo')


router.post('/userinfo', addUserInfo);
router.get('/userinfo', getallUsers);
router.get('/userinfo/:userId', getUserInfoById);

module.exports = router;