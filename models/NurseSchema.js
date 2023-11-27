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
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
});
NurseSchema.virtual('patientCount', {
  ref: 'Patient',
  localField: '_id',
  foreignField: 'nurse',
  count: true,
});
module.exports = mongoose.model("Nurse", NurseSchema);