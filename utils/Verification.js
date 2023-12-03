const crypto = require('crypto');
const VerificationToken = require('../models/VerificationToken');

const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

const sendVerificationEmail = async (email, verificationToken) => {
    // Implement your email sending logic here
    
};

const saveVerificationToken = async (token, userId, action, expiration) => {
    await VerificationToken.create({
        token,
        userId,
        action,
        expiration,
    });
};

module.exports = {
    generateVerificationToken,
    sendVerificationEmail,
    saveVerificationToken,
};
