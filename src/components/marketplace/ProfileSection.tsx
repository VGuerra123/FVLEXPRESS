import React from "react";
import { useUser } from "../../hooks/useUser";

export const ProfileSection: React.FC = () => {
  const { current, orders } = useUser("u1");

  if (!current) return <p>No se encontró el usuario</p>;

  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-6 mb-8">
          <img
            src={current.avatar}
            alt={current.name}
            className="w-20 h-20 rounded-full shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-blue-900">{current.name}</h2>
            <p className="text-gray-600">{current.email}</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-blue-900 mb-4">Historial de compras</h3>
        <div className="bg-white/70 backdrop-blur-md shadow-md rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blue-100 text-blue-900 font-semibold">
              <tr>
                <th className="px-4 py-2"># Orden</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{o.id}</td>
                  <td className="px-4 py-2">{o.date}</td>
                  <td className="px-4 py-2">${o.total.toLocaleString()} CLP</td>
                  <td className="px-4 py-2">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
