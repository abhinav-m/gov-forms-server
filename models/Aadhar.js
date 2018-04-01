const mongoose = require('mongoose');

const AadharSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  poa_docs: {
    type: 'String',
    enum: [
      'Passport',
      'PAN card',
      'Voter ID',
      'Driving license',
      'Passbook',
      'Electricity bill',
      'Phone bill',
    ],
    required: true,
  },
  rel_details: {
    rel_to: {
      type: String,
      enum: ['Father', 'Mother', 'Guardian', 'Spouse'],
      required: true,
    },
    rel_name: {
      type: String,
      required: true,
      trim: true,
    },
    rel_adhaar_no: {
      type: Number,
      required: true,
    },
  },
  poi_docs: {
    type: 'String',
    enum: [
      'Passport',
      'PAN card',
      'Voter ID',
      'Driving license',
      'Passbook',
      'Electricity bill',
      'Phone bill',
    ],
    required: true,
  },
});

const Aadhar = mongoose.model('Aadhar', AadharSchema);

module.exports = Aadhar;
