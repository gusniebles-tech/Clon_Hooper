// src/components/HotelCard.jsx
"use client";
import { Star, ShieldCheck, Wifi, Car, Snowflake, Utensils, Coffee, Dumbbell, Dog, Bath, Hotel, Beer, TreePalm, Plane, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const amenityIcons = {
  "Free Wi-Fi": Wifi,
  "Parking ($)": Car,
  "Free parking": Car,
  "Air conditioning": Snowflake,
  "Breakfast ($)": Coffee,
  "Restaurant": Utensils,
  "Fitness center": Dumbbell,
  "Pet-friendly": Dog,
  "Outdoor pool": Bath,
  "5-star hotel": Hotel,
  "Bar": Beer,
  "Beach access": TreePalm,
  "Aiport shuttle": Plane,
};

const allowedAmenities = [
  "5-star hotel",
  "Breakfast ($)",
  "Free Wi-Fi",
  "Free parking",
  "Air conditioning",
  "Fitness center",
  "Pet-friendly",
  "Restaurant",
  "Room service",
  "Parking ($)",
  "Aiport shuttle",
  "Bar",
];

export default function HotelCard({ hotel, destino, checkin, checkout, guests }) {

  const [queryCaracteristicas, setQueryCaracteristicas] = useState(9);
  const router = useRouter();

  useEffect(() => {
    const query = () => {
      if (window.innerWidth <= 540) {
        setQueryCaracteristicas(2);
      } else {
        setQueryCaracteristicas(9);
      }
    };
    query();
    window.addEventListener("ajuste", query);
    return () => window.removeEventListener("ajuste", query);
  }, []);

  const VerDisponibilidad = () => {
    const params = new URLSearchParams({
      destino: destino || '',
      checkin: checkin || '',
      checkout: checkout || '',
      guests: guests || '1'
    });

    router.push(`/hotels/${hotel.property_token}?${params.toString()}`);
  };

  return (
    <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-5">
      {/* Imagen */}
      <div className="w-[240px] h-auto flex-shrink-0 p-6 WQuery">
        <img
          src={hotel.images[0] || "https://placehold.co/200x150?text=Sin+Imagen"}
          alt={hotel.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Info */}
      <div className="p-4 w-full flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[2rem]">{hotel.name}</h2>
          <div className="flex">
            {hotel.overall_rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(Math.round(hotel.overall_rating))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500" />
                ))}

                <span className="text-[1.2rem] text-black font-medium mx-2">
                  {hotel.overall_rating.toFixed(1)}
                </span>
              </div>
            )}
            <span className="text-[1.2rem] text-black font-medium">
              ·  {hotel.reviews ? `${hotel.reviews} reseñas` : "Sin reseñas"}
            </span>
          </div>
        </div>


        <div className="flex justify-between PriceQuery">
          {/* Caracteristicas */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-700 Amenities">
            {hotel.amenities &&
              hotel.amenities
                .filter((amenity) => allowedAmenities.includes(amenity))
                .slice(0, queryCaracteristicas)
                .map((amenity, i) => {
                  const Icon = amenityIcons[amenity] || ShieldCheck;
                  return (
                    <div key={i} className="flex items-center gap-8 my-2">
                      <Icon className="w-8 h-8" />
                      <span className="text-[1.2rem] font-medium">{amenity}</span>
                    </div>
                  );
                })}
          </div>

          {/* Precio y botón */}
          <div className="p-4 w-full max-w-sm text-right flex flex-col justify-end">
            {/* Precio por noche */}
            <div className="flex items-baseline gap-2 justify-end">
              <span className="text-[2rem] font-bold">
                {hotel.rate_per_night?.lowest || "N/A"}
              </span>
              <span className="text-[1.2rem] font-medium">/ noche</span>
            </div>

            {/* Total con impuestos */}
            <p className="text-[1.2rem] font-medium mt-1">
              Total {hotel?.total_rate?.lowest || "N/A"}
            </p>
            <p className="text-[1.2rem] font-medium">incluye impuestos y cargos</p>

            {/* Botón */}
            <button className="mt-3 text-[1.4rem] flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              onClick={VerDisponibilidad}
            >
              Ver disponibilidad <ChevronRight size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
