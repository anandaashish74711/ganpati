require('dotenv').config();
const mongoose = require('mongoose');
const { connect } = require('../config/database');
const Patient = require('../models/MedicalData');

exports.addMedicalData = async (req, res) => {
    try {
        await connect();
       
        const { observationNumber, timestamp, frequency, postGenerator,postSensor, bioImpedance, phaseAngle, stepSize, numberOfPoints, visitId, visitDate } = req.body;

        // Create a new Observation document
        const observation = {
            observationNumber,
            timestamp,
            frequency,
            postGenerator,
            postSensor,
            bioImpedance,
            phaseAngle,
            stepSize,
            numberOfPoints
        };

        // Create a new Visit document
        const visit = {
            visitId,
            visitDate,
            observations: [observation]
        };

        const patientId = req.body.patientId;
        
        const patientExists = await Patient.exists({ id: patientId });

        if (!patientExists) {
            return res.status(400).json({
                success: false,
                message: "Patient does not exist"
            });
        }

        // Push the visit to the patient's visits array
        await Patient.findOneAndUpdate(
            { id: patientId },
            { $addToSet: { visits: visit } },
            { new: true } // This option returns the modified document instead of the original
        );
        
        return res.status(200).json({
            success: true,
            message: "Medical data created and associated with patient successfully ✅",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message,
        });
    }
}
