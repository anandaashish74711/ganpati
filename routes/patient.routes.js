const { checkUserRole } = require('../utils/auth');


 
const express = require('express');
const router = express.Router();
const { getUserInfoById,getvisitlenghtbyId } = require('../controllers/Patient');


router.get('/patientInfo/:patientId', getUserInfoById);
router.get('/visitlenght/:patientId',getvisitlenghtbyId);

module.exports = router;
