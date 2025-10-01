'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter  } from "next/navigation";
import { Globe, Search, User, BedSingle, Plane, Tag } from "lucide-react";
import AuthModal from "./AuthModal";

export default function Header({ user, onLogout }) {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter()

  const name = user?.user_metadata?.displayName || user?.user_metadata?.full_name || "";
  const firstName = name.split(" ")[0] || user?.email;

  // Cierra el menú si se hace clic fuera
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
    <article className="p-8 relative">
      <header className="flex items-center justify-between px-[32px] headergrid">
        {/* Logo */}
        <div className="logo-area">
          <Image
            src="/Logo_White.png"
            alt="hopper logo"
            width={121.9}
            height={32}
            onClick={() => router.push("/")}
            className="cursor-pointer"
          />
        </div>

        {/* Links */}
        <div className="menu-area text-[1.6rem] text-white font-semibold nav-wrapper flex items-center justify-between">
          <Link
            href="/"
            className={`mx-10 flex menuMobile ${pathname === "/" ? "btn-activo" : "btn-inactivo"}`}
          >
            <BedSingle className="me-2" color="white" size={20} /> Alojamientos
          </Link>
          <Link
            href="/vuelos"
            className={`mx-10 flex menuMobile ${pathname === "/vuelos" ? "btn-activo" : "btn-inactivo"}`}
          >
            <Plane className="me-2" color="white" size={20} /> Vuelos
          </Link>
          <Link
            href="/ofertas"
            className={`mx-10 flex menuMobile ${pathname === "/ofertas" ? "btn-activo" : "btn-inactivo"}`}
          >
            <Tag className="me-2" color="white" size={20} /> Ofertas
          </Link>
        </div>

        {/* Login / User Menu */}
        <div className="login-menu-area flex justify-between text-[1.6rem] text-white font-semibold items-center marginMobile relative">
          <a href="#" className="noneMobile">
            <Globe color="white" size={20} />
          </a>
          <a href="#" className="flex mx-10 noneMobile">
            <Search className="me-4 noneMobile" color="white" size={20} /> Mis Viajes
          </a>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="px-6 py-3 rounded-2xl text-white flex items-center cursor-pointer hover:bg-gray-700/10"
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
                      onLogout();
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
              className="border-1 px-6 py-3 rounded-2xl text-white flex items-center cursor-pointer"
            >
              <User className="me-1" color="white" size={20} /> Iniciar Sesión
            </button>
          )}
        </div>
      </header>

      {/* MODAL DE LOGIN */}
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </article>
  );
}