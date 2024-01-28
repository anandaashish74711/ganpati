
const { connect } = require('../config/database');
const Patient = require('../models/PatientSchema');
const Nurse = require('../models/NurseSchema');
const Doctor = require('../models/DoctorSchema'); // Import the Doctor model
const { hashPassword, createUser, checkRequiredFields } = require('../utils/auth');

// Find Nurse By Name Function
exports.findNurseByName = async (req, res) => {
  try {
    const { nurseName } = req.body;

    if (!nurseName) {
      return res.status(400).json({
        success: false,
        message: 'Nurse name is required',
      });
    }

    // Find the nurse by name
    const nurse = await Nurse.findOne({ name: nurseName });

    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: 'Nurse not found',
      });
    }

    res.status(200).json({
      success: true,
      nurse,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while finding the nurse by name',
    });
  }
};

// Patient Signup Function
exports.signupPatient = async (req, res) => {
  try {
    await connect(); // Establish database connection

    const {
      name, email, password, role, age, gender, race, height, weight, BMI, bloodGroup, nurseName, comorbidities, medicationHistory
    } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password || !role || !age || !gender || !race || !height || !weight || !BMI || !bloodGroup || !nurseName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const hashedPassword = await hashPassword(password);

    // Find the nurse by name
    let nurse;
    try {
      nurse = await Nurse.findOne({ name: nurseName });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while finding the nurse',
      });
    }

    // If nurse is not found, do not create the patient or user
    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: 'Nurse not found',
      });
    }

    // Create a new patient without specifying the id field
    const newPatient = await Patient.create({
      name,
      age,
      gender,
      race,
      height,
      weight,
      BMI,
      bloodGroup,
      email,
      password: hashedPassword,
      nurse: nurse._id,
      nurseName:nurseName,
      comorbidities,
      medicationHistory,
    });
 // Create a new user associated with the patient
 const newUser = await createUser({ name, email, password: hashedPassword, role }, newPatient._id);
    // Find the doctor associated with the nurse
    const doctor = await Doctor.findOne({ _id: nurse.doctor });

    // Add the new patient to the nurse's patients array
    nurse.patients.push({
      patientId: newPatient._id,
      patientName: name,
    });
    await nurse.save();

    // Also, add the patient to the doctor's patients array (assuming the doctor has a patients array)
    if (doctor) {
      doctor.patients.push({
        patientId: newPatient._id,
        patientName: name,
        nurseName:nurseName,
      });
      await doctor.save();
    }

    res.status(200).json({
      success: true,
      message: 'Patient signup successful',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while signing up the patient',
    });
  }
};




exports.getUserInfoById = async (req, res) => {
    try {
      await connect();
      const patientId = req.params.patientId;
 
     
  
      const patientInfo = await Patient.findOne({_id: patientId })
      .populate({
        path: 'visit',
        populate: {
          path: 'MedicalData',
          model: 'Observation',  
        },
      });

   
      if (!patientInfo) {
        return res.status(404).json({ message: 'User information not found' });
      }
  
      res.status(200).json(patientInfo);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
     

 exports.getvisitlenghtbyId = async (req, res) => {
  const patientId = req.params.patientId;

  try {
    connect();
 
    const patient = await Patient.findOne({_id: patientId });

    if (!patient) {
      return res.status(404).json({ message: 'User not is found'});
    }

    const visitlenght =patient.visit.length


      return res.status(200).json({
        success: true,
        length: visitlenght,
  })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
