'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Globe, Search, User, BedSingle, Plane, Tag, Award } from "lucide-react";
import AuthModal from "./AuthModal";


export default function Header({ user, onLogout }) {
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);

    const name = user?.user_metadata?.displayName || user?.user_metadata?.full_name || "";
    const firstName = name.split(" ")[0];

    return (
        <>
            <article className="p-8 relative">
                <header className="flex items-center justify-between px-[32px] headergrid">
                    <div className="logo-area">
                        <Image src="/Logo_White.png" alt="hopper logo" width={121.9} height={32} />
                    </div>
                    <div className="menu-area text-[1.6rem] text-white font-semibold nav-wrapper flex items-center justify-between">
                        <Link href="/" className={`mx-10 flex menuMobile ${pathname === '/' ? 'btn-activo' : 'btn-inactivo'}`}>
                            <BedSingle className="me-2" color="white" size={20} /> Alojamientos
                        </Link>
                        <Link href="/vuelos" className={`mx-10 flex menuMobile ${pathname === '/vuelos' ? 'btn-activo' : 'btn-inactivo'}`}>
                            <Plane className="me-2" color="white" size={20} /> Vuelos
                        </Link>
                        <Link href="/ofertas" className={`mx-10 flex menuMobile ${pathname === '/ofertas' ? 'btn-activo' : 'btn-inactivo'}`}>
                            <Tag className="me-2" color="white" size={20} />Ofertas
                        </Link>
                    </div>
                    <div className="login-menu-area flex justify-between text-[1.6rem] text-white font-semibold items-center marginMobile">
                        <a href="#" className="noneMobile"><Globe color="white" size={20} /></a>
                        <a href="#" className="flex mx-10 noneMobile"><Search className="me-4 noneMobile" color="white" size={20} /> Mis Viajes</a>

                        {user ? (
                            <button
                                onClick={onLogout}
                                className="px-6 py-3 rounded-2xl text-white flex cursor-pointer hover:bg-gray-700/10"
                            >
                                <User size={20} className="me-2"/>
                                {firstName || user?.email}
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowModal(true)}
                                className="border-1 px-6 py-3 rounded-2xl text-white flex items-center cursor-pointer">
                                <User className="me-1" color="white" size={20} /> Iniciar Sesión
                            </button>
                        )}
                    </div>
                </header>
                {/* MODAL DE LOGIN */}
                {showModal && <AuthModal onClose={() => setShowModal(false)} />}
            </article >
        </>
    );
}
