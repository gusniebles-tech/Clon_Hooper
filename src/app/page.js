import Header from "../components/Header";
import Carrusel from "@/components/Carrusel";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="relative w-full h-[615px] overflow-hidden">
        <Carrusel />
        <Header />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-full w-[100%] max-w-5xl flex items-center gap-6 pointer-events-auto border border-gray-200">
            <div className="flex flex-col flex-1 px-8 py-2">
              <label className="text-gray-600 mb-1">Dónde</label>
              <input
                type="text"
                placeholder="Buscar destinos"
                className="input-estilo"
              />
            </div>
            <div className="flex flex-col flex-1 px-8 py-2">
              <label className="text-gray-600 mb-1">Fechas</label>
              <input
                type="text"
                placeholder="Agregar fechas"
                className="input-estilo"
              />
            </div>
            <div className="flex flex-col flex-1 px-8 py-2">
              <label className="text-gray-600 mb-1">Huéspedes</label>
              <input
                type="number"
                placeholder="2 huéspedes"
                className="input-estilo"
              />
            </div>
            <div className="p-1">
              <button className="bg-blue-600 text-white p-6 rounded-full hover:bg-blue-700 transition flex items-center justify-center">
                <Search className="" color="white" size={22} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
