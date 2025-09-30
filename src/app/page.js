"use client"
import Header from "../components/Header";
import Carrusel from "@/components/Carrusel";
import SearchBar from "@/components/SearchBar";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <>
      <main className="relative w-full h-[615px] overflow-hidden">
        <Carrusel />
        <Header user={user} onLogout={logout} />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none p-6">
          <SearchBar/>
        </div>
      </main>
    </>
  );
}
