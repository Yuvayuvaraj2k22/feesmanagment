const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  department: { type: String, required: true, unique: true }, 
  feeamount: { type: Number, default: 0 }, 
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
