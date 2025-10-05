const Book = require('../models/Book');
const Review = require('../models/Review');


exports.getAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6; // Increased to 6 for better grid layout
  const skip = (page - 1) * limit;

  // Build the query object for search
  const searchQuery = {};
  if (req.query.search) {
    searchQuery.title = { $regex: req.query.search, $options: 'i' };
  }

  try {
    // Aggregation pipeline to calculate average rating for each book
    const booksWithRatings = await Book.aggregate([
      { $match: searchQuery }, // Apply search filter first
      {
        $lookup: { // Join with the 'reviews' collection
          from: 'reviews',
          localField: '_id',
          foreignField: 'bookId',
          as: 'reviews',
        },
      },
      {
        $addFields: { // Add a new field for the average rating
          averageRating: { $avg: '$reviews.rating' },
        },
      },
      { $project: { reviews: 0 } }, // Remove the full reviews array from the final output
      { $sort: { createdAt: -1 } }, // Sort by newest first
      { $skip: skip },
      { $limit: limit },
    ]);
    
    // We still need the total count for pagination
    const totalBooks = await Book.countDocuments(searchQuery);
    
    res.json({
        books: booksWithRatings,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate('addedBy', 'name');
      if (!book) return res.status(404).json({ message: 'Book not found' });
      const reviews = await Review.find({ bookId: req.params.id }).populate('userId', 'name');
      let averageRating = 0;
      if (reviews.length > 0) {
        const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
        averageRating = totalRating / reviews.length;
      }
      res.json({ book, reviews, averageRating: averageRating.toFixed(1) });
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
};

exports.addBook = async (req, res) => {
  const { title, author, description, genre, publishedYear } = req.body;
  try {
    const newBook = new Book({ title, author, description, genre, publishedYear, addedBy: req.user.id });
    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (book.addedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (book.addedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await book.remove();
        res.json({ message: 'Book removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};