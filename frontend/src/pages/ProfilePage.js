import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ProfilePage = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const { data } = await api.get('/users/my-books');
        setMyBooks(data);
      } catch (err) {
        setError('Failed to fetch your books.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyBooks();
  }, []);

  if (loading) return <p>Loading your books...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Published Books</h1>
      {myBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBooks.map(book => (
            <Link to={`/books/${book._id}`} key={book._id} className="border p-4 rounded-lg shadow hover:shadow-xl transition-shadow block">
              <h2 className="text-xl font-semibold truncate">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p>You haven't added any books yet.</p>
      )}
    </div>
  );
};

export default ProfilePage;