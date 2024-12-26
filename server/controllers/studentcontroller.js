const bcrypt = require('bcrypt');
const Student = require('../models/student');
const Fee = require('../models/fees');
const jwt = require('jsonwebtoken');

const getAllStudents = async (req, res) => {
  try {
    const { sortBy } = req.query;
    
    let sortField = 'registerNumber';
    let sortOrder = 1;

    if (sortBy) {
      if (sortBy === 'firstName') {
        sortField = sortBy;
      }
    }

    const students = await Student.find().sort({ [sortField]: sortOrder });

    res.json({ message: 'All students retrieved successfully', data: students });
  } catch (error) {
    console.error('Error retrieving all students:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const addFees = async (req, res) => {
  const { feeAmount, branch } = req.body;
  console.log(feeAmount, branch);
  try {
    // Update feesamount for all students belonging to the specified department
    const updateResult = await Student.updateMany({ branch }, { feesamount: feeAmount });
   res.status(200).json({ message: `Fees updated successfully for department ${branch}` });
      } catch (error) {
    // throw new Error(`Error adding fees for department ${department}: ${error.message}`);
    res.status(404).json({ message: `No students found for department ${branch}` });
  }
};


const registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      registerNumber,
      department,
      branch,
      fatherName,
      emailId,
      age,
      dob,
      permanentAddress,
      password,
      feesamount,
      fineamount,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      firstName,
      lastName,
      registerNumber,
      department,
      branch,
      fatherName,
      emailId,
      age,
      dob,
      permanentAddress,
      password: hashedPassword,
      // feesamount,
      // fineamount,
    });

    // Add fees amount to the respective department
    // await addFees(department, feesamount);

    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully', data: newStudent });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params; // Get student ID from the URL params
    const {
      firstName,
      lastName,
      registerNumber,
      department,
      branch,
      fatherName,
      emailId,
      age,
      dob,
      permanentAddress,
      password,
      feesamount,
      fineamount,
    } = req.body; // Get updated student data from request body

    // Find the student by ID
    let student = await Student.findById(id);

    // If student not found, return error
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update student fields
    student.firstName = firstName;
    student.lastName = lastName;
    student.registerNumber = registerNumber;
    student.department = department;
    student.branch = branch;
    student.fatherName = fatherName;
    student.emailId = emailId;
    student.age = age;
    student.dob = dob;
    student.permanentAddress = permanentAddress;
    student.password = password;
    student.feesamount = feesamount;
    student.fineamount = fineamount;

    // Save the updated student
    student = await student.save();

    res.json({ message: 'Student updated successfully', data: student });
  } catch (error) {
    console.error('Error updating student:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params; // Get student ID from the URL params

    // Find the student by ID and delete
    const deletedStudent = await Student.findByIdAndDelete(id);

    // If student not found, return error
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully', data: deletedStudent });
  } catch (error) {
    console.error('Error deleting student:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if the student exists
    const student = await Student.findOne({ emailId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: student._id }, 'yuvaraj');

    res.status(200).json({ message: 'Login successful', studentToken: token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};



const updateFineAmount = async (req, res) => {
  try {
    const { id } = req.params; // Get student ID from the URL params
    const { fineamount } = req.body; // Get updated fine amount from request body

    // Find the student by ID
    let student = await Student.findById(id);

    // If student not found, return error
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update fine amount field
    student.fineamount = fineamount;

    // Save the updated student
    student = await student.save();

    res.json({ message: 'Fine amount updated successfully', data: student });
  } catch (error) {
    console.error('Error updating fine amount:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params; // Get student ID from the URL params
    const student = await Student.findById(id);

    // If student not found, return error
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student retrieved successfully', data: student });
  } catch (error) {
    console.error('Error retrieving student:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const getStudentProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decodedToken = jwt.verify(token, 'yuvaraj');

    // Get student ID from decoded token
    const studentId = decodedToken.id;

    // Fetch student profile information
    const student = await Student.findById(studentId).select('-password'); // Exclude password field

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ student });
  } catch (error) {
    console.error('Error fetching student profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

module.exports = { addFees,registerStudent, loginStudent, getAllStudents, updateStudent,updateFineAmount,deleteStudent,getStudentById,getStudentProfile};
