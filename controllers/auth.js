const bcrypt = require('bcrypt')
const user = require("../models/user")
const jwt= require('jsonwebtoken')


const{signupAdmin }=require('./Admin')
const{signupDoctor}=require('./Doctor')
const{signupPatient}=require('./Patient')
const{signupNurse}=require('./Nurse')

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
        const { email, password, role } = req.body;

        let existingUser;

        switch (role) {
            case 'Admin':
            case 'Doctor':
            case 'Nurse':
            case 'Patient':
                existingUser = await user.findOne({
                    $or: [
                        { 'details.email': email, role },
                        // Add additional conditions for other roles if needed
                    ],
                });
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid role specified',
                });
        }

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
