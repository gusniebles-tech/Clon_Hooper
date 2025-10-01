import { Suspense } from "react";
import ReservaPageContent from "@/components/ReservaPageContent";


export default function ReservaPage() {
  return (
    <>
      <Suspense fallback={
        <div className="max-w-6xl mx-auto p-6">
          <p className="text-center text-xl">Cargando...</p>
        </div>
      }>
        <ReservaPageContent />
      </Suspense>
    </>
  );
}