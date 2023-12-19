require('dotenv').config();
const { connect } = require('../config/database');
const Observation = require('../models/MedicalData');
const Patient = require('../models/PatientSchema');
const Visit = require('../models/visit');      

const addObservationToVisit = async (req, res) => {
  const { UserId, observationData } = req.body;

  try {
    connect();
 
    const patient = await Patient.findOne({_id: UserId });

    if (!patient) {
      return res.status(404).json({ message: 'User not is found'});
    }

    const newObservation = new Observation({ ...observationData });
    await newObservation.save();

    if (patient.visit.length === 0) {
      const newVisit = new Visit({
        visitDate: new Date(),
        MedicalData: [newObservation._id], // Push only the ObjectId
      });
      await newVisit.save();

      patient.visit.push(newVisit._id);
      await patient.save();

      return res.status(200).json({
        success: true,
        patient: {
          ...patient.toObject(),
          visit: [newVisit],
        },
        message: "Observation added to new visit✅",
      });
    } else {
      const lastVisitId = patient.visit[patient.visit.length - 1];
      const visit = await Visit.findById(lastVisitId);

      if (!visit) {
        return res.status(404).json({ message: 'Visit not found' });
      }

      visit.MedicalData.push(newObservation._id); // Push only the ObjectId
      await visit.save();

      return res.status(200).json({
        success: true,
        patient: {
          ...patient.toObject(),
          visit: [...patient.visit, visit],
        },
        message: "Observation added to existing visit✅",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = addObservationToVisit;