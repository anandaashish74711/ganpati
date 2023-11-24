const { default: mongoose } = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hospital: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    nurses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' }],
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
  });
  module.exports=mongoose.model('Doctor',DoctorSchema)