import React from 'react';
import { useParams } from 'react-router-dom';

const mockProducts = {
  electronics: [
    { id: 101, name: 'Laptop Gamer', price: 899990, image: 'https://via.placeholder.com/250x250' },
    { id: 102, name: 'Smartwatch Fitness', price: 79990, image: 'https://via.placeholder.com/250x250' },
  ],
  fashion: [
    { id: 201, name: 'Chaqueta Invierno', price: 69990, image: 'https://via.placeholder.com/250x250' },
    { id: 202, name: 'Jeans Slim Fit', price: 39990, image: 'https://via.placeholder.com/250x250' },
  ],
};

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const products = mockProducts[categoryId as keyof typeof mockProducts] || [];

  return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-blue-900 mb-10 capitalize">{categoryId}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div key={prod.id} className="bg-white rounded-2xl p-4 shadow hover:shadow-xl transition">
              <img src={prod.image} alt={prod.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="font-bold text-blue-900">{prod.name}</h3>
              <p className="text-blue-700">${prod.price.toLocaleString()} CLP</p>
              <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-lg font-bold hover:scale-105 transition">
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
