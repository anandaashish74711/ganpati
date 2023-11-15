require('dotenv').config();
const mongoose = require('mongoose');
const { connect } = require('../config/database');
const Patient = require('../models/MedicalData');

const { Observation, Visit } = require('./models');

const { connect } = require('../config/database');



const addObservationToVisit = async (req, res) => {
    connect();
    
  const { visitId, createVisit, observationData } = req.body;

  try {
    const newObservation = new Observation({ ...observationData });
    await newObservation.save();

    if (createVisit) {
      const newVisit = new Visit({
        visitDate: new Date(),
        medicalData: [newObservation],
      });
      await newVisit.save();

      return res.status(201).json({ message: 'New visit created with observation' });
    } else {
      // Add observation to existing visit
      const visit = await Visit.findById(visitId);
      if (!visit) {
        return res.status(404).json({ message: 'Visit not found' });
      }

      visit.medicalData.push(newObservation);
      await visit.save();

      return res.status(201).json({ message: 'Observation added to existing visit' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = addObservationToVisit;
