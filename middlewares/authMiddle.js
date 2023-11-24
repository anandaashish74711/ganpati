const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token ⚠️"
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error Occurred in Authentication ⚠️"
        });
    }
};



