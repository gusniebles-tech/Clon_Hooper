import Header from "../components/Header";
import Carrusel from "@/components/Carrusel";

export default function Home() {
  return (
    <>
      <main className="relative w-full h-screen overflow-hidden">
        <Carrusel />
        <Header />
      </main>

    </>
  );
}
