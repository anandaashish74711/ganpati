const express = require('express')
const router = express.Router()
const { getallUsers,getUserInfoById} = require('../controllers/userInfo')



router.get('/userinfo', getallUsers);
router.get('/userinfo/:userId', getUserInfoById);

module.exports = router;