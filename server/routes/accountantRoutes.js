const express = require('express');
const router = express.Router();
const accountantController = require('../controllers/accountantController');

router.post('/register', accountantController.registerAccountant);
router.post('/login', accountantController.loginAccountant);
router.get('/details', accountantController.getAccountantDetails);
router.get('/profile', accountantController. getAccountantProfile);

module.exports = router;
