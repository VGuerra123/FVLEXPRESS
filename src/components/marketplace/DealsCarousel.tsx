import React from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { motion } from "framer-motion";

const deals = [
  { id: 1, name: "Smartphone Pro X", price: 399990, image: "https://via.placeholder.com/350x350", rating: 4.7, tag: "🔥 Oferta del Día" },
  { id: 2, name: "Zapatillas Urban Style", price: 49990, image: "https://via.placeholder.com/350x350", rating: 4.5, tag: "⭐ Bestseller" },
  { id: 3, name: "Audífonos Inalámbricos", price: 29990, image: "https://via.placeholder.com/350x350", rating: 4.6, tag: "⚡ Flash Sale" },
  { id: 4, name: "Smartwatch Active", price: 89990, image: "https://via.placeholder.com/350x350", rating: 4.4, tag: "✨ Nuevo" },
];

export const DealsCarousel: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-12 text-center md:text-left">
          Ofertas Destacadas
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3500 }}
          loop={true}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet bg-blue-300 opacity-70",
            bulletActiveClass: "swiper-pagination-bullet-active bg-blue-600 opacity-100 scale-125",
          }}
        >
          {deals.map((deal, index) => (
            <SwiperSlide key={deal.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-3xl bg-white/60 backdrop-blur-md shadow-xl hover:shadow-2xl border border-white/40 transition overflow-hidden"
              >
                {/* Imagen */}
                <div className="relative">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-4 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 rounded-full shadow-lg">
                    {deal.tag}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-6 text-center space-y-3">
                  <h3 className="font-bold text-blue-900 text-lg line-clamp-1">
                    {deal.name}
                  </h3>

                  {/* Precio destacado */}
                  <p className="text-2xl font-extrabold text-blue-700">
                    ${deal.price.toLocaleString()} CLP
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center text-yellow-500 gap-1">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-sm font-semibold">{deal.rating}</span>
                  </div>

                  {/* Botón */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="relative mt-4 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg hover:shadow-xl hover:brightness-110 transition overflow-hidden"
                  >
                    <span className="relative z-10">Agregar al Carrito</span>
                    <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 hover:opacity-100 transition"></span>
                  </motion.button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
