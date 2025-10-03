'use client';
import "../app/styles/searchBar.css";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBar() {
    const [destino, setDestino] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(2);
    const [sugerencias, setSugerencias] = useState([]);

    const debouncedDestino = useDebounce(destino, 200);
    const router = useRouter();

    const searchButton = (e) => {
        e.preventDefault();
        if (!destino.trim()) return;

        const parametros = new URLSearchParams({
            destino,
            checkin: checkIn,
            checkout: checkOut,
            guests: guests.toString(),
        })

        router.push(`/hotels?${parametros.toString()}`);
    }

    useEffect(() => {
        const ciudades = async () => {
            if (debouncedDestino.length > 1) {
                try {
                    const response = await fetch(`/api/hotels?destino=${encodeURIComponent(destino)}&sugerencias=true`);
                    const data = await response.json();
                    setSugerencias(data.predicciones || []);
                } catch (error) {
                    console.error("Error al cargar las sugerencias: ", error)
                }
            } else {
                setSugerencias([]);
            }
        };
        ciudades();
    }, [debouncedDestino]);

    const seleccion = (ciudad) => {
        setDestino(ciudad);
        setSugerencias([]);
    }

    return (
        <>
            <div className="bg-white rounded-full w-[78rem] max-w-[78rem] flex items-center gap-6 pointer-events-auto border border-gray-200 searchBar">
                <div className="relative flex flex-col flex-1 px-8 py-2 edge">
                    <label className="text-gray-600">Dónde</label>
                    <input
                        type="text"
                        placeholder="Buscar destinos"
                        className="input-estilo text-[1.4rem] font-medium" value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                    />
                    {sugerencias.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-5 max-h-60 overflow-y-auto">
                            {sugerencias.map((ciudad, index) => (
                                <li
                                    key={index}
                                    onClick={() => seleccion(ciudad)}
                                    className="x-4 py-2 cursor-pointer hover:bg-gray-100 text-[1.4rem] font-medium"
                                >
                                    {ciudad}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex flex-col flex-1 px-8 py-2 edge">
                    <label className="text-gray-600 mb-1">Fechas</label>
                    <div className="flex gap-1 justify-between">
                        <input
                            type="date"
                            className="block w-full min-w-[125px] text-gray-800 bg-white rounded-lg text-[1.2rem] font-medium appearance-auto"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                        <input
                            type="date"
                            className="block w-full text-gray-800 min-w-[125px] bg-white rounded-lg text-[1.2rem] font-medium appearance-auto"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-1 px-4 py-2 edge huespedesmobil">
                    <label className="text-gray-600 mb-1">Huéspedes</label>
                    <input
                        type="number"
                        placeholder="2 huéspedes"
                        className="input-estilo text-[1.2rem] font-medium"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                    />
                </div>
                <div className="p-1 searchContenedor">
                    <button className="bg-blue-600 text-white p-6 rounded-full hover:bg-blue-700 transition flex items-center justify-center searchButton" onClick={searchButton}>
                        <Search className="searchdNone" color="white" size={22} /> <span className="text-[1.5rem] font-[600] hidden textBuscar">Buscar</span>
                    </button>
                </div>
            </div>
        </>
    );
}