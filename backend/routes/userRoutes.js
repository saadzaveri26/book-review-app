const express = require('express');
const router = express.Router();
const { getMyBooks } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// This is a protected route, so only logged-in users can access it
router.get('/my-books', protect, getMyBooks);

module.exports = router;