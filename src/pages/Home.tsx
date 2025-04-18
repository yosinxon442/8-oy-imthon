// pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import useSearchBooks from '../hooks/useSearchBooks';
import { useAuth } from '../contexts/AuthContext';
import '../styles/pages/Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    allBooks,
    isLoading,
    error
  } = useSearchBooks();

  // Qidiruv natijalarini yoki barcha kitoblarni ko'rsatish
  const displayBooks = searchQuery.length > 2 ? searchResults : allBooks;

  if (!user) {
    return null;
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Kutubxonalar Tizimiga Xush Kelibsiz</h1>
        <p className="hero-description">
          Zamonaviy kutubxona tizimi orqali bilim olish imkoniyati
        </p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Kitob nomi, muallif yoki nashriyot bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" />
        </div>
      </div>

      {/* Displaying Search Results */}
      <div className="search-results">
        {isLoading && <p className="loading-text">Yuklanmoqda...</p>}
        {error && <p className="error-text">{error}</p>}
        
        {displayBooks && displayBooks.length > 0 ? (
          <div className="books-grid">
            {displayBooks.map((book) => (
              <Link 
                to={`/book/${book.id}`} 
                key={book.id} 
                className="book-card"
              >
                <div className="book-info">
                  <h3 className="book-title">{book.name}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-publisher">{book.publisher}</p>
                  {book.quantity_in_library && (
                    <p className="book-quantity">
                      Mavjud: {book.quantity_in_library}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !isLoading && (
            <p className="no-results">
              {searchQuery.length > 2 ? 'Hech qanday kitob topilmadi' : 'Kitoblar mavjud emas'}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Home;