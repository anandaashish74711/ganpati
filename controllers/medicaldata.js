require('dotenv').config();
const mongoose = require('mongoose');
const { connect } = require('../config/database');
const Observation = require('../models/MedicalData');
const UserInfo = require('../models/userInfo');
const Visit = require('../models/visit');      

const addObservationToVisit = async (req, res) => {
  const { UserId, observationData } = req.body;

  try {
    connect();

    const userInfo = await UserInfo.findOne({ UserId: UserId });

    if (!userInfo) {
      return res.status(404).json({ message: 'User not his found'});
    }

    const newObservation = new Observation({ ...observationData });
    await newObservation.save();

    if (userInfo.visit.length === 0) {
      const newVisit = new Visit({
        visitDate: new Date(),
        MedicalData: [newObservation._id], // Push only the ObjectId
      });
      await newVisit.save();

      userInfo.visit.push(newVisit._id);
      await userInfo.save();

      return res.status(200).json({
        success: true,
        userInfo: {
          ...userInfo.toObject(),
          visit: [newVisit],
        },
        message: "Observation added to new visit✅",
      });
    } else {
      const lastVisitId = userInfo.visit[userInfo.visit.length - 1];
      const visit = await Visit.findById(lastVisitId);

      if (!visit) {
        return res.status(404).json({ message: 'Visit not found' });
      }

      visit.MedicalData.push(newObservation._id); // Push only the ObjectId
      await visit.save();

      return res.status(200).json({
        success: true,
        userInfo: {
          ...userInfo.toObject(),
          visit: [...userInfo.visit, visit],
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