import React from 'react';
import { BookOpen, Users, Library } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Biz Haqimizda
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            O'zbekiston kutubxonalari uchun yagona qidiruv tizimi
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">1000+ Kitoblar</h3>
            <p className="text-gray-500">Barcha kutubxonalardagi kitoblarni bir joydan qidirishingiz mumkin</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <Users className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">10000+ Foydalanuvchilar</h3>
            <p className="text-gray-500">Minglab foydalanuvchilar tomonidan ishonchli deb topilgan</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <Library className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">50+ Kutubxonalar</h3>
            <p className="text-gray-500">O'zbekistonning barcha hududlaridagi kutubxonalar</p>
          </div>
        </div>
      </div>
    </div>
  );
}