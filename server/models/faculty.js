const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  dob: String,
  qualification: String,
  department: String,
  email: String,
  address: String,
  password: String,
  role: { type: String, default: 'faculty', enum: ['admin', 'faculty', 'accountant', 'student'] },
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
