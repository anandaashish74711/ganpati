const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
  });
  module.exports=mongoose.model('Admin',AdminSchema)