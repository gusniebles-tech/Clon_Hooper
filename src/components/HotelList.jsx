// src/components/HotelList.jsx
import HotelCard from "./HotelCard";

export default function HotelList({ hotels = [] }) {
  if (!hotels || hotels.length === 0) {
    return <p className="text-gray-500">No se encontraron alojamientos</p>;
  }

  return (
    <div className="flex-1">
      <p className="text-gray-700 mb-4">
        {hotels.length} alojamientos disponibles
      </p>
      {hotels.map((hotel, i) => (
        <HotelCard key={i} hotel={hotel} />
      ))}
    </div>
  );
}
