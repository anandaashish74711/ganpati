const { checkUserRole } = require('../utils/auth');

 
const express = require('express');
const router = express.Router();
const { getUserInfoById } = require('../controllers/Patient');

router.get('/patientInfo/:patientId', getUserInfoById);

module.exports = router;
