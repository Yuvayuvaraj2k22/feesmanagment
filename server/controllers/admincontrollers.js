const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword, 
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully', data: newAdmin });
    console.log(newAdmin);
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Received login request:', { email, password });

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Admin not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Stored hashed password:', admin.password);

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: admin._id, userType: 'admin' }, 'yuvaraj');

    res.json({ message: 'Login successful', token, userType: 'admin' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decodedToken = jwt.verify(token, 'yuvaraj');

    // Get the admin user ID from the decoded token
    const adminId = decodedToken.userId;

    // Fetch the admin profile using the user ID
    const admin = await Admin.findById(adminId).select('-password');

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Send the admin profile data in the response
    res.json(admin);
  } catch (error) {
    console.error('Error fetching admin profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { registerAdmin, loginAdmin, getAdminProfile};
