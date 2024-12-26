const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontrollers');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/profile', adminController. getAdminProfile);

module.exports = router;
