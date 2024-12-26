const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Accountant = require('../models/accountant');

const registerAccountant = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newAccountant = new Accountant({
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hashedPassword,
    });

    await newAccountant.save();
    res.status(201).json({ message: 'Accountant registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginAccountant = async (req, res) => {
  try {
    const { email, password } = req.body;

    const accountant = await Accountant.findOne({ email });
    if (!accountant) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, accountant.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ email: accountant.email, userType: 'accountant' }, 'yuvaraj');

console.log(token);
    res.json({ message: 'Login successful', token, userType: 'accountant' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAccountantDetails = async (req, res) => {
  try {
    const accountants = await Accountant.find();
    res.status(200).json({ message: 'Accountant details retrieved successfully', data: accountants });
  } catch (error) {
    console.error('Error fetching accountant details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAccountantProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decodedToken = jwt.verify(token, 'yuvaraj');

    // Get the accountant email from the decoded token
    const email = decodedToken.email;

    // Fetch the accountant profile using the email
    const accountant = await Accountant.findOne({ email });

    if (!accountant) {
      return res.status(404).json({ error: 'Accountant not found' });
    }

    // Send the accountant profile data in the response
    res.json(accountant);
  } catch (error) {
    console.error('Error fetching accountant profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







module.exports = { registerAccountant, loginAccountant, getAccountantDetails,getAccountantProfile };
