const Admin = require('../models/AdminSchema');
const { hashPassword, createUser, checkRequiredFields } = require('../utils/auth');


exports.signupAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        checkRequiredFields(req, res, ['name', 'email', 'password', 'role']);

        const hashedPassword = await hashPassword(password);

        const newAdmin = await Admin.create({ name, email, password: hashedPassword });

        const newUser = await createUser({ name, email, password: hashedPassword, role }, newAdmin._id);

        return res.status(200).json({
            success: true,
            newUser,
            newAdmin,
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