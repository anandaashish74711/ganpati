
const Nurse = require('../models/NurseSchema');
const Doctor = require('../models/DoctorSchema'); // Assuming you have a Doctor model
const { hashPassword, createUser, checkRequiredFields } = require('../utils/auth');

exports.signupNurse = async (req, res) => {
    try {
        const { name, email, password, role, doctorId } = req.body;

        // Check if all required fields are present
        if (!name || !email || !password || !role || !doctorId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const hashedPassword = await hashPassword(password);

        const newNurse = await Nurse.create({
            name,
            email,
            password: hashedPassword,
            doctor: doctorId,
            // You may add additional nurse-specific fields here
        });

        const newUser = await createUser({ name, email, password: hashedPassword, role }, newNurse._id);

        // Add the new nurse to the doctor's nurses array
        const doctor = await Doctor.findById(doctorId);
        doctor.nurses.push(newNurse._id);
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