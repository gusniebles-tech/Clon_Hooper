"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AuthModal from "@/components/AuthModal";

export default function ReservarButton({ property_token }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const fromModal = useRef(false);

  // Verificar usuario actual al cargar
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();

    // Suscripción a cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user || null);

        if (session?.user && fromModal.current) {
          setShowAuthModal(false);
          // Construir URL con parámetros
          const url = buildReservaUrl();
          router.push(url);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [property_token, router, searchParams]);

  // Función para construir la URL de reserva con todos los parámetros
  const buildReservaUrl = () => {
    const destino = searchParams.get("destino") || "";
    const checkin = searchParams.get("checkin") || "";
    const checkout = searchParams.get("checkout") || "";
    const guests = searchParams.get("guests") || "1";

    const params = new URLSearchParams({
      destino,
      checkin,
      checkout,
      guests
    });

    return `/reservas/${property_token}?${params.toString()}`;
  };

  const handleClick = () => {
    if (!user) {
      fromModal.current = true;
      setShowAuthModal(true);
    } else {
      const url = buildReservaUrl();
      router.push(url);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-[1.4rem] font-medium"
      >
        Reservar
      </button>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}