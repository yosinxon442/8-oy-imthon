import React from 'react';
import { MapPin, Phone, Book } from 'lucide-react';

export default function Libraries() {
  const libraries = [
    {
      id: 1,
      name: "Alisher Navoiy nomidagi O'zbekiston Milliy kutubxonasi",
      address: "Toshkent sh., Navoiy ko'chasi, 1-uy",
      phone: "+998 71 232 83 89",
      books: 1000,
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Abu Ali ibn Sino nomidagi kutubxona",
      address: "Buxoro sh., Ibn Sino ko'chasi, 45",
      phone: "+998 65 223 45 67",
      books: 500,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <div className="container">
      <h1 className="form-title">Kutubxonalar</h1>

      <div className="library-grid">
        {libraries.map((library) => (
          <div key={library.id} className="library-card">
            <img
              src={library.image}
              alt={library.name}
              className="library-image"
            />
            <div className="library-content">
              <h3 className="library-title">{library.name}</h3>
              <div className="library-info">
                <MapPin size={20} />
                <span>{library.address}</span>
              </div>
              <div className="library-info">
                <Phone size={20} />
                <span>{library.phone}</span>
              </div>
              <div className="library-info">
                <Book size={20} />
                <span>{library.books}+ kitoblar</span>
              </div>
              <button className="btn btn-primary">Batafsil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}