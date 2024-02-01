const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hospital: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type:String,required:true},
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  nurses: [{
    nurseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' },
    nurseName: { type: String },
  }],
  patients: [{
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    patientName: { type: String },
    nurseName: { type: String }, 
  }],
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
