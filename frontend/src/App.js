import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddBookPage from './pages/AddBookPage';
import BookDetailsPage from './pages/BookDetailsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="App bg-gray-50 min-h-screen">
      {/* Conditionally render Navbar so it doesn't show on login/signup */}
      {!isAuthPage && <Navbar />}
      
      {/* Conditionally apply main content padding */}
      <main className={!isAuthPage ? "container mx-auto p-4 md:p-6" : ""}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} /> {/* <-- ADDED THIS LINE */}
                <Route path="/add-book" element={<AddBookPage />} />
                <Route path="/books/:id" element={<BookDetailsPage />} />
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;