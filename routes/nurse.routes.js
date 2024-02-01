const express = require('express');
const router = express.Router();
const { getNurseInfo } = require('../controllers/Nurse');


router.get('/nurse/:nurseId', getNurseInfo);

module.exports = router;
