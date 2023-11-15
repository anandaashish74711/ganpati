
const mongoose = require('mongoose');
const { Timeseries } = require('mongoose-timeseries');

const ObservationSchema = new mongoose.Schema({
  observationNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    required: true,
    index: true, // Add an index for efficient time-based queries
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
});

// Configure the Mongoose time series plugin
ObservationSchema.plugin(Timeseries, {
  timeField: 'timestamp', 
  granularity: 'second', 
  metaField: 'meta', 
});

const Observation = mongoose.model('Observation', ObservationSchema);

