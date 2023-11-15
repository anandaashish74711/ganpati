require('dotenv').config();
const mongoose = require('mongoose');
const { connect } = require('../config/database');
const Observation = require('../models/MedicalData');
const UserInfo = require('../models/userInfo');
const Visit = require('../models/visit');

const addObservationToVisit = async (req, res) => {
  const { UserId, observationData } =req.body;

  try {
    connect();

    const userInfo =await UserInfo.findOne({ UserId: UserId });

    const newObservation = new Observation({ ...observationData });
    await newObservation.save();

    if (userInfo) {
      const visitArrayLength = userInfo.visit.length;

      if (visitArrayLength === 0) {
        const newVisit = new Visit({
          visitDate: new Date(),
          medicalData: [newObservation],
        });
        await newVisit.save();
      }
    } else {
      const lastIndex = userInfo.visit.length - 1;
      const lastVisitId = userInfo.visit[lastIndex];

      const visit = await Visit.findById(lastVisitId);
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
