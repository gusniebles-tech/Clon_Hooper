"use client";
import "../app/styles/HotelClientPage.css";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe, Search, User } from "lucide-react"; // ícono
import { useState, useEffect } from "react";

export default function HeaderHotel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destino, setDestino] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    setDestino(searchParams.get("destino") || "");
    setCheckin(searchParams.get("checkin") || "");
    setCheckout(searchParams.get("checkout") || "");
    setGuests(searchParams.get("guests") || 1);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ destino, checkin, checkout, guests });
    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <header className="px-6 py-8 shadow-md bg-white Headerpading">
      <main className="w-[65vw] m-auto flex items-center justify-between px-6 HPwidth HPcol">
        {/* Logo */}
        <div className="flex items-center gap-2 logo-area">
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
          className="flex items-center border rounded-full shadow-sm px-3 py-2 gap-2 flex-1 max-w-2xl mx-6 menu-area formQ w-[100%]"
        >
          <div className="destino">
            <input
              type="text"
              placeholder="Buscar destino..."
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="outline-none border-r pr-2 text-base wInput"
            />
          </div>
          <div className="fecha flex ">
            <input
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="outline-none text-[1rem]"
            />
            <input
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="outline-none text-[1rem]"
            />
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="outline-none w-16 text-[1rem] wInput"
            />
          </div>
          <div className="btn">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 btnW"
            >
              <Search className="" color="white" size={15} />
            </button>
          </div>
        </form>

        {/* Idioma y login */}
        <div className="flex items-center gap-4 login-menu-area">
          <Globe size={20} className="HdNone" />
          <button className="px-[2.4rem] py-[1rem] text-[1.6rem] font-semibold border rounded-[1.2rem] text-blue-600 hover:bg-blue-50 Bmediaq flex">
            <User className="text-blue-600 me-2 hidden" size={20} />
            Iniciar sesión
          </button>
        </div>
      </main>
    </header>
  );
}
