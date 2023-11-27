const mongoose = require('mongoose')

const acceptedBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    race: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    BMI: { type: Number, required: true },
    bloodGroup: { type: String, required: true, enum: acceptedBloodGroups },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nurse: { type: mongoose.Schema.Types.ObjectId, ref: 'Nurse', required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' },
    comorbidities: {
      diabetes: Boolean,
      HTN: Boolean,
      asthma: Boolean,
      smoking: Boolean,
      alcoholUse: Boolean,
      kidneyDisease: Boolean,
      pastMI: Boolean,
      pastCVA: Boolean,
      priorStenting: Boolean,
      priorCABG: Boolean
    },
    medicationHistory: {
      diuretics: Boolean
    },  
    visit: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visit',
  }],

  });
  module.exports = mongoose.model('Patient', PatientSchema)
  