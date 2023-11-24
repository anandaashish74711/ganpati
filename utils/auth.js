const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user'); // Assuming you have a user model

require('dotenv').config();

// Common utility function to hash password
exports.hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error(`Hashing password error: ${error.message}`);
    }
};

// Common utility function to create user
exports.createUser = async (userData, details) => {
    try {
        const newUser = await user.create({
            ...userData,
            details,
        });
        return newUser;
    } catch (error) {
        throw new Error(`User creation failed: ${error.message}`);
    }
};

// Common utility function to check required fields
exports.checkRequiredFields = (req, res, fields) => {
    for (const field of fields) {
        if (!req.body[field]) {
            return res.status(400).json({
                success: false,
                message: `${field} is required`,
            });
        }
    }
};


exports.checkUserRole = (role) => {
    return (req, res, next) => {
        try {
            if (req.user.role === role) {
                next(); // User has the specified role, continue to the route handler
            } else {
                return res.status(401).json({
                    success: false,
                    message: `You are not authorized as ${role} ⚠️`
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Something error occurred ⚠️: ${error}`
            });
        }
    };
};

    

