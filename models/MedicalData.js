const mongoose = require('mongoose');

const ObservationSchema =  new mongoose.Schema(
    {
      timestamp: Date,
      messages: Number,
      
      observationNumber: {
        type: Number,
        required: true,
        unique: true,
      },
      frequency: {
        type: Number,
        required: true,
      },
      postGenerator: {
        type: Number,
        required: true,
      },
      postSensor: {
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

      metadata: {
        discordId: String,
      },
    },
    {
      timeseries: {
        timeField: 'timestamp',
        metaField: 'metadata',
        granularity: 'hours',
      },
    },
  );



const Observation = mongoose.model('Observation', ObservationSchema);

module.exports = Observation;
