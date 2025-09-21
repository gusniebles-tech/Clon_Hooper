"use client";
import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import "../app/styles/DetailsPage.css"
import "../app/styles/HotelClientPage.css";

export default function GalleryModal({ images }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón de ver más fotos */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#FFFFFF] bg-opacity-50 px-8 py-2 text-black font-medium text-[1.4rem] flex rounded-4xl cursor-pointer items-center"
      >
        <LayoutGrid size={20} className="me-2"/>
        Ver Galeria ({images.length})
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-[70vw] w-full overflow-y-auto max-h-[90vh] GMwidth">
            <button
              onClick={() => setOpen(false)}
              className="ml-auto block mb-4 text-red-600 font-bold"
            >
              ✖ Cerrar
            </button>
            <div className="grid grid-cols-3 gap-2 GMimg">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="hotel"
                  className="w-full h-auto object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
