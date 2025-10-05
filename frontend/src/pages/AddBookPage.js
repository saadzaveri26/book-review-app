import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', formData);
      navigate('/'); // Redirect to homepage after successfully adding a book
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Add a New Book</h2>
      {error && <p className="bg-red-200 text-red-800 p-3 mb-4 rounded">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Add form inputs for title, author, description, genre, and publishedYear */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Title</label>
          <input type="text" name="title" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Author</label>
          <input type="text" name="author" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea name="description" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Genre</label>
            <input type="text" name="genre" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Published Year</label>
            <input type="number" name="publishedYear" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded">Submit Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;