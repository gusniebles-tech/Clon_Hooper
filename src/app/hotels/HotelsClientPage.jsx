"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarFilters from "@/components/SidebarFilters";
import HotelList from "@/components/HotelList";
import HeaderHotel from "@/components/HeaderHotels";

export default function Hoteles() {
    const busquedadParametros = useSearchParams();
    const destino = busquedadParametros.get("destino") || "";
    const checkin = busquedadParametros.get("checkin") || "";
    const checkout = busquedadParametros.get("checkout") || "";
    const guests = busquedadParametros.get("guests") || "1";

    const [hoteles, setHoteles] = useState([]);
    const [carga, setCarga] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!destino) return;

        const hoteles = async () => {
            setCarga(true);
            setError(null);
            try {
                const params = new URLSearchParams({ destino, checkin, checkout, guests });
                const response = await fetch(`/api/hotels?${params.toString()}`);

                if (!response.ok) throw new Error("Error en la respuesta del servidor");

                const data = await response.json();
                setHoteles(data.hoteles || []);
            } catch (error) {
                console.error(error);
                setError("No se pudieron cargar los hoteles.");
            } finally {
                setCarga(false);
            }
        };

        hoteles();
    }, [destino, checkin, checkout, guests]);

    return (
        <>
            <HeaderHotel />
            <div className="flex gap-6 p-6">
                <SidebarFilters />

                <div className="flex-1">
                    {carga && <p className="text-gray-500">Cargando hoteles...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!carga && !error && <HotelList hotels={hoteles} />}
                </div>
            </div>
        </>
    );
}
