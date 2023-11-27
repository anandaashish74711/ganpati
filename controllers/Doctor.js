const Doctor = require('../models/DoctorSchema');
const Admin = require('../models/AdminSchema'); // Assuming you have an Admin model
const { hashPassword, createUser, checkRequiredFields } = require('../utils/auth');

exports.signupDoctor = async (req, res) => {
    try {
        const { name, email, password, role, adminId, hospital } = req.body;

        // Check if all required fields are present
        if (!name || !email || !password || !role || !adminId || !hospital) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const hashedPassword = await hashPassword(password);

        const newDoctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            adminId: adminId,
            hospital,
            // You may add additional doctor-specific fields here
        });

        const newUser = await createUser({ name, email, password: hashedPassword, role }, newDoctor._id);

        // Add the new doctor to the admin's doctors array
        const admin = await Admin.findById(adminId);
        admin.doctors.push(newDoctor._id);
        await admin.save();

        return res.status(200).json({
            success: true,
            newUser,
            newDoctor,
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
