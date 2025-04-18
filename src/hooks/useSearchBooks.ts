// hooks/useSearchBooks.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  name: string;
  author: string;
  publisher: string;
  quantity_in_library: number;
  library?: {
    id: number;
    address: string;
    social_link?: string;
  };
}

interface UseSearchBooksReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Book[];
  allBooks: Book[];
  isLoading: boolean;
  error: string | null;
  fetchAllBooks: () => Promise<void>;
}

const useSearchBooks = (): UseSearchBooksReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://s-libraries.uz/api/v1/books/books/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllBooks(data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Kitoblar ro\'yxatini yuklashda xatolik');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const searchBooks = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://s-libraries.uz/api/v1/books/search/book/?q=${encodeURIComponent(searchQuery)}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setSearchResults(data);
        } catch (err) {
          console.error('Error searching books:', err);
          setError('Qidirishda xatolik yuz berdi');
        } finally {
          setIsLoading(false);
        }
      };

      const timer = setTimeout(() => {
        searchBooks();
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    allBooks,
    isLoading,
    error,
    fetchAllBooks
  };
};

export default useSearchBooks;