import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const BookDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 5, reviewText: '' });
  const [error, setError] = useState(''); // This was a missing state variable

  const fetchBookDetails = async () => {
    try {
      const res = await api.get(`/books/${id}`);
      setBookDetails(res.data);
    } catch (err) {
      setError('Could not fetch book details.');
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/books/${id}/reviews`, newReview);
      setNewReview({ rating: 5, reviewText: '' });
      fetchBookDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${id}`);
        navigate('/');
      } catch (err) {
        setError('Failed to delete the book.');
      }
    }
  };
  
  // --- IMPORTANT: Handle loading and error states first ---
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!bookDetails) return <p className="text-center mt-10">Loading...</p>;

  // --- Destructure variables ONLY after you know bookDetails exists ---
  const { book, reviews, averageRating } = bookDetails;

  return (
    <div className="space-y-8">
      {/* Book Information Section */}
      <div className="p-6 border rounded-lg shadow-md relative">
        {user && book.addedBy && user.id === book.addedBy._id && (
          <div className="absolute top-4 right-4 space-x-2">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit</button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
          </div>
        )}
        
        <h1 className="text-4xl font-bold">{book.title}</h1>
        <p className="text-xl text-gray-700 mt-2">by {book.author}</p>
        <div className="flex items-center mt-4">
          <span className="text-2xl font-bold text-yellow-500">★ {averageRating}</span>
          <span className="text-gray-600 ml-2">({reviews.length} reviews)</span>
        </div>
        <p className="mt-4 text-gray-800">{book.description}</p>
        <div className="mt-4 text-sm text-gray-500">
          <span>Genre: {book.genre}</span> | <span>Published: {book.publishedYear}</span>
        </div>
      </div>

      {/* Add Review Form */}
      {user && (
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block font-semibold">Rating</label>
              <select name="rating" value={newReview.rating} onChange={handleReviewChange} className="w-full p-2 border rounded">
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Review</label>
              <textarea name="reviewText" value={newReview.reviewText} onChange={handleReviewChange} className="w-full p-2 border rounded" required></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Submit Review</button>
          </form>
        </div>
      )}

      {/* Reviews List Section */}
      <div className="p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review._id} className="border-b pb-2">
                <p className="font-semibold">{review.userId.name} - <span className="text-yellow-500">★ {review.rating}</span></p>
                <p className="text-gray-700">{review.reviewText}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to write one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;