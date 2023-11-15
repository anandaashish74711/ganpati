const express = require('express')
const router = express.Router()
const { addMedicalData } = require('../controllers/medicaldata')    


router.post('/observation', addObservationToVisit);

module.exports = router;