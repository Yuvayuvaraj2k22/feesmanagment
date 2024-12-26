const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  registerNumber: { type: String, required: true },
  department: { type: String, required: true },
  branch: { type: String, required: true },
  fatherName: { type: String, required: true },
  emailId: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student', enum: ['admin', 'faculty', 'accountant', 'student'] },
  feesamount: { type: Number, default: 0 }, 
  fineamount:{type: Number,default: 0},
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
