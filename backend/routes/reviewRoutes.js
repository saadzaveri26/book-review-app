const express = require('express');
const router = express.Router();
const { updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
router.put('/:reviewId', protect, updateReview);
router.delete('/:reviewId', protect, deleteReview);
module.exports = router;