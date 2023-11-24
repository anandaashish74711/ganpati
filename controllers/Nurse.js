const Nurse = require('../models/NurseSchema')
const { hashPassword, createUser, checkRequiredFields } = require('../utils/auth');

exports.signupNurse = async (req, res) => {
    try {
        const { name, email, password, role, doctorId } = req.body;

        checkRequiredFields(req, res, ['name', 'email', 'password', 'role', 'doctorId']);

        const hashedPassword = await hashPassword(password);

        const newNurse = await Nurse.create({
            name,
            email,
            password: hashedPassword,
            doctor: doctorId,
            // You may add additional nurse-specific fields here
        });

        const newUser = await createUser({ name, email, password: hashedPassword, role }, newNurse._id);

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