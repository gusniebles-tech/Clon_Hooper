"use client";
import "../app/styles/HotelClientPage.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe, Search, User } from "lucide-react"; // ícono
import { useState, useEffect, useRef } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "@/hooks/useAuth";

export default function HeaderHotel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuth();

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

  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const name = user?.user_metadata?.displayName || user?.user_metadata?.full_name || "";
  const firstName = name.split(" ")[0] || user?.email;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="px-6 py-8 shadow-md bg-white Headerpading">
      <main className="w-[70vw] m-auto flex items-center justify-between px-6 HPwidth HPcol">
        {/* Logo */}
        <div className="flex items-center gap-2 logo-area cursor-pointer"
          onClick={() => router.push("/")}>
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
          className="flex items-center border justify-between rounded-full shadow-sm px-3 py-2 gap-2 flex-1 max-w-fit w-fit mx-6 menu-area formQ"
        >
          <div className="destino">
            <input
              type="text"
              placeholder="Buscar destino..."
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="outline-none border-r pr-2 wInput text-[1.2rem] font-medium"
            />
          </div>
          <div className="fecha flex ">
            <input
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="outline-none text-[1rem] text-[1.2rem] font-medium"
            />
            <input
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="outline-none text-[1rem] text-[1.2rem] font-medium"
            />
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="outline-none w-16 text-[1rem] wInput text-[1.2rem] font-medium"
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
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-[1.2rem] px-[2.4rem] py-[1rem] rounded-2xl text-blue-600 font-semibold flex items-center cursor-pointer text-[1.6rem] hover:bg-blue-50 Bmedia"
              >
                <User size={20} className="me-2" />
                {firstName}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-black">
                  <Link
                    href="/mis-viajes"
                    className="block px-4 py-2 hover:bg-gray-100 text-[1.3rem] font-medium"
                    onClick={() => router.push("/mis-viajes")}
                  >
                    Mis Viajes
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[1.3rem] font-medium"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="border rounded-[1.2rem] px-[2.4rem] py-[1rem] rounded-2xl text-blue-600 font-semibold flex items-center cursor-pointer text-[1.6rem] hover:bg-blue-50 Bmedia"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </main>

      {/* MODAL DE LOGIN */}
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </header>
  );
}
