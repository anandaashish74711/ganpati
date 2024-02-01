const mongoose = require("mongoose");
const Nurse = require('../models/NurseSchema');
const Doctor = require('../models/DoctorSchema');
const { hashPassword, createUser, checkRequiredFields } = require('../utils/auth');

exports.signupNurse = async (req, res) => {
    try {
        const { name, email, password, role, doctorName } = req.body;

        // Check if all required fields are present
        if (!name || !email || !password || !role || !doctorName) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const hashedPassword = await hashPassword(password);

        // Find the doctor by name
        const doctor = await Doctor.findOne({ name: doctorName });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found',
            });
        }

        const newNurse = await Nurse.create({
            name,
            email,
            password: hashedPassword,
            role,
            doctor: doctor._id, // Use doctor's ID instead of name
        });

        const newUser = await createUser({ name, email, password: hashedPassword, role }, newNurse._id);

        // Add the new nurse to the doctor's nurses array
        doctor.nurses.push({ nurseId: newNurse._id, nurseName: name });
        await doctor.save();

        return res.status(200).json({
            success: true,
            newUser,
            newNurse,
            message: 'User created successfully ✅',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User registration failed',
        });
    }
};

exports.getNurseInfo = async (req, res) => {
  try {
    const nurseId = req.params.nurseId; 
    console.log(nurseId)
    const nurseInfo = await Nurse.findOne({ _id: nurseId });

    if (!nurseInfo) {
      console.log('Nurse information not found');
      return res.status(404).json({ message: 'Nurse information not found' });
    }

    res.status(200).json(nurseInfo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



