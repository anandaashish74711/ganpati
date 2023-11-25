const Doctor = require('../models/DoctorSchema')
const { hashPassword, createUser, checkRequiredFields } = require('../utils/auth');
exports.signupDoctor = async (req, res) => {
    try {
        const { name, email, password, role, adminId, hospital } = req.body;

        checkRequiredFields(req, res, ['name', 'email', 'password', 'role', 'adminId', 'hospital']);

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
