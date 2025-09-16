// src/components/HotelCard.jsx
"use client";
import { Star } from "lucide-react";

export default function HotelCard({ hotel }) {
  return (
    <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-5">
      {/* Imagen */}
      <div className="w-[240px] h-[253px] flex-shrink-0">
        <img
          src={hotel.images[0].thumbnail || "https://placehold.co/200x150?text=Sin+Imagen"}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          {/* Nombre + Rating */}
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">{hotel.name}</h2>
            <div className="text-right">
              {hotel.rating && (
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(Math.round(hotel.rating))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500" />
                  ))}
                </div>
              )}
              <span className="text-sm text-gray-500">
                {hotel.reviews ? `${hotel.reviews} reseñas` : "Sin reseñas"}
              </span>
            </div>
          </div>

          {/* Descripción corta */}
          {hotel.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {hotel.description}
            </p>
          )}
        </div>

        {/* Precio y botón */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-xl font-bold text-gray-800">
            {hotel.price?.extracted_lowest
              ? `${hotel.price.extracted_lowest} US$`
              : "Consultar"}
          </p>
          <a
            href={hotel.link || "#"}
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Ver disponibilidad
          </a>
        </div>
      </div>
    </div>
  );
}
