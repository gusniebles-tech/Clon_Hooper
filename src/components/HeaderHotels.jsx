"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react"; // ícono
import { useState } from "react";

export default function HeaderHotel() {
  const router = useRouter();
  const [destino, setDestino] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ destino, checkin, checkout, guests });
    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/Logo_Horizontal.png"
          alt="Hopper logo"
          width={120}
          height={40}
          priority
        />
      </div>

      {/* Barra de búsqueda */}
      <form
        onSubmit={handleSearch}
        className="flex items-center border rounded-full shadow-sm px-3 py-2 gap-2 flex-1 max-w-2xl mx-6"
      >
        <input
          type="text"
          placeholder="Buscar destino..."
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          className="outline-none border-r pr-2 text-sm flex-1"
        />
        <input
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          className="outline-none text-sm"
        />
        <input
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className="outline-none text-sm"
        />
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="outline-none w-16 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
        >
          🔍
        </button>
      </form>

      {/* Idioma y login */}
      <div className="flex items-center gap-4">
        <Globe className="w-6 h-6 text-gray-600" />
        <button className="px-4 py-1 border rounded-lg text-blue-600 hover:bg-blue-50">
          Iniciar sesión
        </button>
      </div>
    </header>
  );
}
