import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Book, Library, LogOut, Home, Info } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          <Book size={32} />
          <span>UzLib</span>
        </Link>

        {user && (
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <Home size={20} />
              <span>Bosh sahifa</span>
            </Link>
            <Link to="/about" className="nav-link">
              <Info size={20} />
              <span>Biz haqimizda</span>
            </Link>
            <Link to="/libraries" className="nav-link">
              <Library size={20} />
              <span>Kutubxonalar</span>
            </Link>
            <button onClick={handleLogout} className="nav-link">
              <LogOut size={20} />
              <span>Chiqish</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}