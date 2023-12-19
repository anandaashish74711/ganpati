const express = require('express')

const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000


app.use(express.json())


//calling Database function
require('./config/database').connect()

//route importing and mounting
const user = require('./routes/user')
const medicaldata = require('./routes/medicaldata.router')
const patient = require('./routes/patient.routes')


app.use('/api/v1', user)
app.use('/api/v1', medicaldata)
app.use('/api/v1',patient)



const HOST = 'localhost'; // You can replace 'localhost' with your specific host

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});
