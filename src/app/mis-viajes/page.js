import { Suspense } from "react";
import HeaderHotel from "@/components/HeaderHotels";
import MisViajesContent from "@/components/MisViajesContent";

// Componente principal con Suspense
export default function MisViajesPage() {
  return (
    <>
      <HeaderHotel />
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-xl">Cargando...</div>
          </div>
        </div>
      }>
        <MisViajesContent />
      </Suspense>
    </>
  );
}