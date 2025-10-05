const Book = require('../models/Book');

// @desc    Get books added by the logged-in user
// @route   GET /api/users/my-books
exports.getMyBooks = async (req, res) => {
    try {
        // Find books where the 'addedBy' field matches the logged-in user's ID
        const books = await Book.find({ addedBy: req.user.id }).sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};