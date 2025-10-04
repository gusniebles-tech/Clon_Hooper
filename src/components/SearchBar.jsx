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
    const [cargando, setCargando] = useState(false);

    const debouncedDestino = useDebounce(destino, 300);
    const router = useRouter();

    const fechaActual = new Date().toISOString().split('T')[0];

    const getMinCheckout = () => {
        if (!checkIn) return fechaActual;
        const fecha = new Date(checkIn);
        fecha.setDate(fecha.getDate() + 1);
        return fecha.toISOString().split('T')[0];
    };

    const searchButton = (e) => {
        e.preventDefault();
        if (!destino.trim()) {
            alert('Por favor ingresa un destino');
            return;
        }
        if (!checkIn) {
            alert('Por favor selecciona una fecha de check-in');
            return;
        }
        if (!checkOut) {
            alert('Por favor selecciona una fecha de check-out');
            return;
        }

        const parametros = new URLSearchParams({
            destino,
            checkin: checkIn,
            checkout: checkOut,
            guests: guests.toString(),
        })

        router.push(`/hotels?${parametros.toString()}`);
    }

    useEffect(() => {
        const obtenerSugerencias = async () => {
            if (debouncedDestino.length > 1) {
                setCargando(true);
                try {
                    const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(debouncedDestino)}`);
                    const data = await response.json();
                    setSugerencias(data.sugerencias || []);
                } catch (error) {
                    console.error("Error al cargar las sugerencias: ", error);
                    setSugerencias([]);
                } finally {
                    setCargando(false);
                }
            } else {
                setSugerencias([]);
            }
        };
        obtenerSugerencias();
    }, [debouncedDestino]);

    const seleccion = (ciudad) => {
        setDestino(ciudad);
        setSugerencias([]);
    }

    return (
        <>
            <div className="bg-white rounded-full w-[100%] w-fit flex items-center gap-6 pointer-events-auto border border-gray-200 searchBar">
                <div className="relative flex flex-col flex-1 px-6 py-2 edge">
                    <label className="text-gray-600">Dónde</label>
                    <input
                        type="text"
                        placeholder="Buscar destinos"
                        className="input-estilo text-[1.4rem] font-medium" value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        required
                    />
                    {(sugerencias.length > 0 || cargando) && (
                        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50 max-h-60 overflow-y-auto">
                            {cargando ? (
                                <li className="px-4 py-2 text-[1.4rem] text-gray-500">
                                    Cargando...
                                </li>
                            ) : (
                                sugerencias.map((ciudad, index) => (
                                    <li
                                        key={index}
                                        onClick={() => seleccion(ciudad)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-[1.4rem] font-medium"
                                    >
                                        {ciudad}
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                </div>
                <div className="flex flex-col flex-1 px-6 py-2 edge">
                    <label className="text-gray-600 mb-1">Fechas</label>
                    <div className="flex gap-1 justify-between">
                        <input
                            type="date"
                            className="block w-full min-w-[125px] text-gray-800 bg-white rounded-lg text-[1.2rem] font-medium appearance-auto"
                            value={checkIn}
                            min={fechaActual}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            className="block w-full text-gray-800 min-w-[125px] bg-white rounded-lg text-[1.2rem] font-medium appearance-auto"
                            value={checkOut}
                            min={getMinCheckout()}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-1 px-6 edge huespedesmobil">
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