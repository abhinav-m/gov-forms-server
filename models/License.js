const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  license_type: {
    type: String,
    enum: [
      'Motorcycle - with gear',
      'Mothercycle- without gear',
      'Invalid carriage',
      'Light motor vehicle',
      'Transport vehicle',
      'E-rickshaw',
      'Transport vehicle',
    ],
    required: true,
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
  email: { type: String },
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
  blood_type: {
    b_type: {
      type: 'String',
      enum: ['A', 'B', 'AB', 'O'],
      required: true,
    },
    b_type_rh: {
      type: 'String',
      enum: ['Positive', 'Negative'],
      required: true,
    },
  },
});

const License = mongoose.model('License', LicenseSchema);

module.exports = License;
