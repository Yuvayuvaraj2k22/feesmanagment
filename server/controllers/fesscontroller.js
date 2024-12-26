const Fee = require('../models/fees');
const Student = require('../models/student');


const addFees = async (department, feeAmount) => {
  try {
    let fee = await Fee.findOne({ department });

    if (!fee) {
      fee = new Fee({
        department,
        feeamount: feeAmount,
      });
    } else {
      fee.feeamount = parseFloat(feeAmount); 
    }
    await fee.save();

    return fee;
  } catch (error) {
    throw new Error(`Error adding fees for department ${department}: ${error.message}`);
  }
};


module.exports = { addFees };
