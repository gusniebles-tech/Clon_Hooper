'use client'
import Image from "next/image";
import { Globe, Search, User, BedSingle, Plane, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

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
                        <a href="#" className="border-1 px-6 py-3 rounded-2xl isMobil flex"><User className="hidden blockMobile me-1" color="white" size={20} />  Iniciar Sesión</a>
                    </div>
                </header>
            </article>
        </>
    );
}
