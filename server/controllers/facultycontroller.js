const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Faculty = require('../models/faculty');

const registerFaculty = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      dob,
      qualification,
      department,
      email,
      address,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new Faculty({
      firstName,
      lastName,
      age,
      dob,
      qualification,
      department,
      email,
      address,
      password: hashedPassword,
    });

    await newFaculty.save();

    res.status(201).json({ message: 'Faculty registered successfully', data: newFaculty });
    console.log(newFaculty);
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, faculty.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: faculty._id, userType: 'faculty' }, 'yuvaraj');

    res.json({ message: 'Login successful', token, userType: 'faculty' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFacultyProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decodedToken = jwt.verify(token, 'yuvaraj');

    // Get the faculty user ID from the decoded token
    const facultyId = decodedToken.userId;

    // Fetch the faculty profile using the user ID
    const faculty = await Faculty.findById(facultyId).select('-password');

    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    // Send the faculty profile data in the response
    res.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFacultyDetails = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json({ message: 'Faculty details retrieved successfully', data: faculties });
  } catch (error) {
    console.error('Error fetching faculty details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerFaculty, loginFaculty, getFacultyDetails, getFacultyProfile };
