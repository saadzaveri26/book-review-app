const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReviewForBook = async (req, res) => {
  const { rating, reviewText } = req.body;
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const review = new Review({ rating, reviewText, bookId: req.params.bookId, userId: req.user.id });
    await review.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateReview = async (req, res) => {
    const { rating, reviewText } = req.body;
    try {
        let review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        review.rating = rating || review.rating;
        review.reviewText = reviewText || review.reviewText;
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await review.remove();
        res.json({ message: 'Review removed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};