require('dotenv').config();
const mongoose = require('mongoose'); // Import mongoose
const { connect } = require('../config/database');
const UserInfo = require('../models/userInfo');
const User = require('../models/user');
const checkUserRole = require('../middlewares/authMiddle');


exports.getUserInfoById = async (req, res) => {
  try {
    await connect();
    const userId = req.params.userId;

    const userInfo = await UserInfo.findOne({ UserId: userId })
    .populate({
      path: 'visit',
      populate: {
        path: 'MedicalData',
        model: 'Observation', // Assuming 'ObservationSchema' is the model name
      },
    });
 
    if (!userInfo) {
      return res.status(404).json({ message: 'User information not found' });
    }

    res.status(200).json(userInfo);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getallUsers = async (req, res) => {
  try {
    await connect();

    const userId = req.body.userId; 

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'Admin') {
      return res.status(401).json({ message: 'User is not an admin' });
    }

 
    try {
      const userInfo = await UserInfo.find();

      if (!userInfo) {
        return res.status(404).json({ message: 'No user information found' });
      }

      res.status(200).json(userInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};