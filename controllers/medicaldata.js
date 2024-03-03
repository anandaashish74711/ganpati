require('dotenv').config();
const { connect } = require('../config/database');
const Observation = require('../models/MedicalData');
const Patient = require('../models/PatientSchema');
const Visit = require('../models/visit');  

const addObservationToVisit = async (req, res) => {
  console.log('Received POST request on /observation endpoint');
  const { UserId, visitcount, observationData } = req.body;
  console.log(`visitcount${visitcount}`)

  try {
    console.log('Connecting to database...');
    connect();

    console.log('Searching for patient with ID:', UserId);
    const patient = await Patient.findOne({ _id: UserId });

    if (!patient) {
      console.log('Patient not found.');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Creating new observation...');
    const newObservation = new Observation({ ...observationData });
    await newObservation.save();
    console.log('Observation saved:', newObservation);

    if (patient.visit.length === visitcount) {
      console.log('Creating new visit...');
      const newVisit = new Visit({
        visitDate: new Date(),
        MedicalData: [newObservation._id], // Push only the ObjectId
      });
      await newVisit.save();
      console.log('New visit saved:', newVisit);

      patient.visit.push(newVisit._id);
      await patient.save();
      console.log('Patient visit updated:', patient);

      return res.status(200).json({
        success: true,
        patient: {
          ...patient.toObject(),
          visit: [newVisit],
        },
        message: 'Observation added to new visit✅',
      });
    } else {
      const lastVisitId = patient.visit[patient.visit.length - 1];
      console.log('Finding last visit with ID:', lastVisitId);
      const visit = await Visit.findById(lastVisitId);

      if (!visit) {
        console.log('Last visit not found.');
        return res.status(404).json({ message: 'Visit not found' });
      }

      visit.MedicalData.push(newObservation._id); // Push only the ObjectId
      await visit.save();
      console.log('Existing visit updated:', visit);

      return res.status(200).json({
        success: true,
        patient: {
          ...patient.toObject(),
          visit: [...patient.visit, visit],
        },
        message: 'Observation added to existing visit✅',
      });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = addObservationToVisit;
