// src/components/SidebarFilters.jsx
"use client";

export default function SidebarFilters() {
  return (
    <aside className="w-72 bg-white border border-gray-200 rounded-xl p-4 h-fit sticky top-20">
      <h3 className="font-semibold mb-3">Filtrar por:</h3>

      {/* Presupuesto */}
      <div className="mb-5">
        <p className="text-sm font-medium">Tu presupuesto (por noche)</p>
        <input type="range" min="20" max="200" className="w-full mt-2" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>20 US$</span>
          <span>200 US$+</span>
        </div>
      </div>

      {/* Instalaciones */}
      <div className="mb-5">
        <p className="text-sm font-medium mb-2">Instalaciones</p>
        <label className="flex items-center gap-2 text-sm mb-1">
          <input type="checkbox" /> Piscina
        </label>
        <label className="flex items-center gap-2 text-sm mb-1">
          <input type="checkbox" /> Desayuno incluido
        </label>
        <label className="flex items-center gap-2 text-sm mb-1">
          <input type="checkbox" /> Se admiten mascotas
        </label>
      </div>

      {/* Tipos */}
      <div>
        <p className="text-sm font-medium mb-2">Tipos de alojamientos</p>
        <label className="flex items-center gap-2 text-sm mb-1">
          <input type="checkbox" /> Hoteles
        </label>
        <label className="flex items-center gap-2 text-sm mb-1">
          <input type="checkbox" /> Apartamentos
        </label>
      </div>
    </aside>
  );
}
