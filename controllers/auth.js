const bcrypt = require('bcrypt')
const user = require("../models/user")
const jwt= require('jsonwebtoken')
const Nurse = require('../models/NurseSchema'); 
const Patient= require('../models/PatientSchema'); 
const Admin= require('../models/AdminSchema'); 
const Doctor= require('../models/DoctorSchema'); 


const{signupAdmin }=require('./Admin')
const{signupDoctor}=require('./Doctor')
const{signupPatient}=require('./Patient')
const{signupNurse}=require('./Nurse')
const { ObjectId } = require('mongodb')

require('dotenv').config()
const generateToken = (user) => {
    const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
};

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


        // Use the correct model based on the role to query the user
        let userModel;
        switch (role) {
            case 'Admin':
                userModel = Admin;
                break;
            case 'Doctor':
                userModel = Doctor; 
                break;
            case 'Nurse':
                userModel = Nurse;
                break;
            case 'Patient':
                userModel = Patient; 
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid role specified',
                });
        }
        let existingUser = await userModel.findOne({ 'email': email});



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
