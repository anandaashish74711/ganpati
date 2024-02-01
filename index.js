const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// calling Database function
require('./config/database').connect();

// route importing and mounting
const user = require('./routes/user');
const medicaldata = require('./routes/medicaldata.router');
const patient = require('./routes/patient.routes');
const Nurse=require('./routes/nurse.routes')

app.use('/api/v1', user);
app.use('/api/v1', medicaldata);
app.use('/api/v1', patient);
app.use('/api/v1',Nurse);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
