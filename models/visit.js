
const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    visitDate: {
        type: Date,
        required: true,
    },
   
    MedicalData:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ObservationSchema',
        }
    ]
});

const Visit = mongoose.model('Visit',VisitSchema)

module.exports = Visit;
