const mongoose = require("mongoose");

const NurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patients: [{
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    patientName: { type: String, ref: "Patient" }, 
  }],
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
});

module.exports = mongoose.model('Nurse', NurseSchema);

