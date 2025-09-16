import { Suspense } from "react";
import Hoteles from "./HotelsClientPage";

export default function PaginaHoteles() {
  return (
    <Suspense fallback={<div>Cargando búsqueda...</div>}>
      <HotelsClientPage />
    </Suspense>
  );
}