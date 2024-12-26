const mongoose = require('mongoose');

const accountantSchema = new mongoose.Schema({
  fullName: String,
  dateOfBirth: String,
  gender: String,
  address: String,
  phoneNumber: String,
  email: String,
  password: String,
  role: { type: String, default: 'accountant', enum: ['admin', 'faculty', 'accountant', 'student'] },
});

const Accountant = mongoose.model('Accountant', accountantSchema);

module.exports = Accountant;
