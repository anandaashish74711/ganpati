const mongoose = require('mongoose');

const ObservationSchema = new mongoose.Schema({
    observationNumber: {
        type: Number,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        required: true,
    },
    frequency: {
        type: Number,
        required: true,
    },
    postGenerator: {
        type: Number,
        required: true,
    },
    bioImpedance: {
        type: Number,
        required: true,
    },
    phaseAngle: {
        type: Number,
        required: true,
    },
    stepSize: {
        type: Number,
        required: true,
    },
    numberOfPoints: {
        type: Number,
        required: true,
    },
});

const VisitSchema = new mongoose.Schema({
    visitId: {
        type: String,
        required: true,
        unique: true
    },
    visitDate: {
        type: Date,
        required: true,
    },
    observations: [ObservationSchema],
});

const PatientSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    visits: [VisitSchema],
});

module.exports = mongoose.model('Patient', PatientSchema);
