
const Patient = require('../models/PatientSchema');
const Nurse = require('../models/NurseSchema'); // Assuming you have a Nurse model
const { hashPassword, createUser, checkRequiredFields } = require('../utils/auth');

// Patient Signup Function
exports.signupPatient = async (req, res) => {
  try {
      const { name, email, password, role, age, gender, race, height, weight, BMI, bloodGroup, nurseId, comorbidities, medicationHistory } = req.body;

      // Check if all required fields are present
      if (!name || !email || !password || !role || !age || !gender || !race || !height || !weight || !BMI || !bloodGroup || !nurseId) {
          return res.status(400).json({
              success: false,
              message: 'All fields are required',
          });
      }

      const hashedPassword = await hashPassword(password);

      // Find the nurse by nurseId
      let nurse;
      try {
          nurse = await Nurse.findById(nurseId);
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
          nurse: nurseId,
          comorbidities,
          medicationHistory,
      });

      // Create a new user associated with the patient
      const newUser = await createUser({ name, email, password: hashedPassword, role }, newPatient._id);

      // Add the new patient to the nurse's patients array
      nurse.patients.push(newPatient._id);
      await nurse.save();

  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: 'An error occurred while signing up the patient',
      });
  }
};
