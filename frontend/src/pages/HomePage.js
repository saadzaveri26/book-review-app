import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const HomePage = () => {
  const [data, setData] = useState({ books: [], currentPage: 1, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // This API call now includes both pagination and search
        const res = await api.get(`/books?page=${page}&search=${searchTerm}`);
        setData(res.data);
      } catch (err) {
        setError("Could not fetch books.");
        console.error(err);
      }
    };

    // This delays the API call by 500ms after the user stops typing
    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, searchTerm]); // The effect re-runs if the page or search term changes

  return (
    <div>
      {/* Header with Search Bar */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">All Books</h1>
        <input 
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded shadow-sm w-full md:w-1/3"
        />
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.books.map(book => (
          <Link to={`/books/${book._id}`} key={book._id} className="border p-4 rounded-lg shadow hover:shadow-xl transition-shadow block">
            <h2 className="text-xl font-semibold truncate">{book.title}</h2>
            <div className="flex items-center mt-2">
              <span className="text-lg font-bold text-yellow-500">
                ★ {book.averageRating ? book.averageRating.toFixed(1) : 'N/A'}
              </span>
              <span className="text-gray-500 text-sm ml-2">({book.author})</span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              Published in {book.publishedYear}
            </p>
          </Link>
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center items-center space-x-4">
        <button 
          onClick={() => setPage(p => Math.max(p - 1, 1))} 
          disabled={data.currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="font-semibold">Page {data.currentPage} of {data.totalPages}</span>
        <button 
          onClick={() => setPage(p => Math.min(p + 1, data.totalPages))}
          disabled={data.currentPage === data.totalPages}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;