import HotelCard from "./HotelCard";

export default function HotelList({ hotels = [], destino, checkin, checkout, guests }) {
  if (!hotels || hotels.length === 0) {
    return <p className="text-gray-500">No se encontraron alojamientos</p>;
  }

  return (
    <div className="flex-1">
      <div>
        <p className="text-gray-700 mb-4 text-[2.4rem] font-bold"><span className="capitalize">{destino}: </span>{hotels.length} alojamientos disponibles</p>
      </div>
      {hotels.map((hotel, index) => (
        <HotelCard
          key={hotel.property_token || index}
          hotel={hotel}
          destino={destino}
          checkin={checkin}
          checkout={checkout}
          guests={guests}
        />
      ))}
    </div>
  );
}
