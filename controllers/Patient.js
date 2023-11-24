const { hashPassword, createUser, checkRequiredFields } = require('../utils/auth');
exports.signupPatient = async (req, res) => {
    try {
        const { name, email, password, role, age, gender, race, height, weight, BMI, bloodGroup, nurseId, comorbidities, medicationHistory } = req.body;

        checkRequiredFields(req, res, ['name', 'email', 'password', 'role', 'age', 'gender', 'race', 'height', 'weight', 'BMI', 'bloodGroup', 'nurseId']);

        const hashedPassword = await hashPassword(password);

        // Replace the placeholder with your actual Patient model creation
        const newPatient = await Patient.create({
            name,
            age,
            gender,
            race,
            height,
            weight,
            BMI,
            bloodGroup,
            email,
            password: hashedPassword,
            nurse: nurseId,
            comorbidities,
            medicationHistory,
        });

        const newUser = await createUser({ name, email, password: hashedPassword, role }, newPatient._id);

        return res.status(200).json({
            success: true,
            newUser,
            newPatient,
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