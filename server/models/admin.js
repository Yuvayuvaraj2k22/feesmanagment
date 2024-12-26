const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: 'admin', enum: ['admin', 'faculty', 'accountant', 'student'] },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
