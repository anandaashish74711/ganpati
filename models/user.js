const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['Admin', 'Doctor', 'Nurse', 'Patient'], required: true },
  details: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    refPath: 'role',
    validate: {
      validator: async function(value) {
        const Model = mongoose.model(this.role);
        const doc = await Model.findOne({ _id: value });
        return doc !== null;
      },
      message: props => `${props.value} is not a valid ObjectId for role ${props.path.split('.')[0]}.`
    }
  },

});



  
module.exports = mongoose.model('user', userSchema)
