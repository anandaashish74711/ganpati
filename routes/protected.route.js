// Require the middleware
const { auth } = require('../middlewares/authMiddle');

// Define the protected route
app.get('/protected', auth, (req, res) => {
    // This route is protected, user is authenticated
    res.status(200).json({ message: 'Protected route accessed', user: req.user });
});
