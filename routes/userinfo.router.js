const { checkUserRole } = require('../utils/auth');

 
const express = require('express');
const router = express.Router();
const { getallUsers, getUserInfoById } = require('../controllers/userInfo');

router.get('/userinfo', checkUserRole('admin'), getallUsers);
router.get('/userinfo/:userId', getUserInfoById);

module.exports = router;
