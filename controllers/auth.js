const bcrypt = require('bcrypt')
const user = require("../models/user")
const jwt= require('jsonwebtoken')


const{signupAdmin }=require('./Admin')
const{signupPatient}=require('./Patient')
const{signupNurse}=require('./Nurse')
const{signupDoctor}=require('./Doctor')
require('dotenv').config()

//signup handle
exports.signup = async (req, res) => {
    try {
        const { role } = req.body;

        switch (role) {
            case 'Admin':
                return await signupAdmin(req, res);
            case 'Doctor':
                return await signupDoctor(req, res);
            case 'Nurse':
                return await signupNurse(req, res);
            case 'Patient':
                return await signupPatient(req, res);
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid role specified',
                });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User registration failed',
        });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        // Verify password
        if (await bcrypt.compare(password, existingUser.password)) {
            const token = generateToken(existingUser);
            return res.status(200).json({
                success: true,
                token,
                user: existingUser,
                message: 'Logged in successfully ✅',
            });
        } else {
            return res.status(403).json({
                success: false,
                message: 'Password incorrect ⚠️',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Login failure ⚠️: ' + error,
        });
    }
};

// Helper function to generate JWT token
const generateToken = (user) => {
    const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
};



