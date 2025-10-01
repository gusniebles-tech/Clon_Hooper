// src/app/reservas/[i]/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import HeaderHotel from "@/components/HeaderHotels";

function ReservaPageContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const propertyToken = params?.i;

  // Traemos datos de la URL (checkin, checkout, guests, destino)
  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const guests = searchParams.get("guests") || "1";
  const destino = searchParams.get("destino") || "";

  // Estado hotel
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Estado formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  // Estados para el modal y envío
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reservaId, setReservaId] = useState(null);

  // Verificar usuario autenticado
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        // Si no hay usuario, redirigir al hotel
        router.push(`/hotels/${propertyToken}`);
        return;
      }
      setUser(data.user);
      // Pre-llenar el email del usuario
      setFormData(prev => ({
        ...prev,
        email: data.user.email || ""
      }));
    };
    checkUser();
  }, [propertyToken, router]);

  // Traer info del hotel por property_token
  useEffect(() => {
    async function fetchHotel() {
      try {
        setLoading(true);
        setError(null);

        // Construir URL con todos los parámetros
        const params = new URLSearchParams({
          property_token: propertyToken,
          destino: destino,
          checkin: checkin,
          checkout: checkout,
          guests: guests
        });

        const res = await fetch(`/api/hotels?${params.toString()}`);
        
        if (!res.ok) {
          throw new Error("Error al cargar el hotel");
        }

        const data = await res.json();
        
        if (data.ok && data.hotel) {
          setHotel(data.hotel);
        } else {
          throw new Error("No se encontró el hotel");
        }
      } catch (err) {
        console.error("Error al cargar hotel:", err);
        setError(err.message);
        setHotel(null);
      } finally {
        setLoading(false);
      }
    }

    if (propertyToken) {
      fetchHotel();
    }
  }, [propertyToken, destino, checkin, checkout, guests]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcularNoches = () => {
    if (!checkin || !checkout) return 0;
    const entrada = new Date(checkin);
    const salida = new Date(checkout);
    const diferencia = salida - entrada;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén llenos
    if (!formData.nombre.trim() || !formData.apellido.trim() || 
        !formData.email.trim() || !formData.telefono.trim()) {
      alert("Por favor completa todos los campos del formulario");
      return;
    }

    // Validar email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor ingresa un email válido");
      return;
    }

    // Validar teléfono (al menos 7 dígitos)
    if (formData.telefono.length < 7) {
      alert("Por favor ingresa un número de teléfono válido");
      return;
    }

    setSubmitting(true);

    try {
      const noches = calcularNoches();

      // Guardar en Supabase
      const { data: reserva, error: insertError } = await supabase
        .from("reservas")
        .insert([
          {
            user_id: user.id,
            property_token: propertyToken,
            hotel_nombre: hotel.name,
            destino: destino,
            nombre: formData.nombre.trim(),
            apellido: formData.apellido.trim(),
            email: formData.email.trim(),
            telefono: formData.telefono.trim(),
            fecha_entrada: checkin,
            fecha_salida: checkout,
            numero_huespedes: parseInt(guests),
            numero_noches: noches,
            precio_por_noche: hotel.rate_per_night?.lowest || "N/A",
            precio_total: hotel.total_rate?.lowest || hotel.rate_per_night?.lowest || "N/A",
            estado: "confirmada"
          }
        ])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Mostrar modal de éxito
      setReservaId(reserva.id);
      setShowModal(true);

    } catch (err) {
      console.error("Error al crear reserva:", err);
      alert(`Error al procesar la reserva: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/");
  };

  if (loading) {
    return (
      <>
        <HeaderHotel />
        <div className="max-w-6xl mx-auto p-6">
          <p className="text-center text-xl">Cargando datos del hotel...</p>
        </div>
      </>
    );
  }

  if (error || !hotel) {
    return (
      <>
        <HeaderHotel />
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error || "No se encontró información del hotel"}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderHotel />
      <div className="max-w-6xl mx-auto p-6">
        {/* Pasos */}
        <div className="flex items-center justify-center mb-8 text-[1.4rem] font-medium">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">1</div>
            <span className="mr-4">Selecciona un hotel</span>
            <span className="mr-4">───</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">2</div>
            <span className="mr-4">Tus datos</span>
            <span className="mr-4">───</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full border border-gray-400 text-gray-400 flex items-center justify-center mr-2">3</div>
            <span>Paso final</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Tu viaje</h2>
            <div className="mb-6 text-gray-700">
              <p><strong>Fechas:</strong> {checkin} → {checkout}</p>
              <p><strong>Habitación:</strong> ({guests} {guests === "1" ? "adulto" : "adultos"})</p>
              <p><strong>Noches:</strong> {calcularNoches()}</p>
            </div>

            <h2 className="text-2xl font-bold mb-4">Ingresa tus datos</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre *"
                value={formData.nombre}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido *"
                value={formData.apellido}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico *"
                value={formData.email}
                onChange={handleChange}
                className="border p-3 rounded-lg col-span-2 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Número de teléfono *"
                value={formData.telefono}
                onChange={handleChange}
                className="border p-3 rounded-lg col-span-2 focus:outline-none focus:border-blue-500"
                required
              />

              <button
                type="submit"
                disabled={submitting}
                className="col-span-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Procesando..." : "Continuar al paso final"}
              </button>
            </form>
          </div>

          {/* Columna derecha: hotel */}
          <div className="border rounded-2xl p-4 shadow-sm h-fit sticky top-4">
            <div className="flex gap-4 mb-4">
              <img
                src={hotel.images?.[0] || "https://placehold.co/200x150?text=Sin+Imagen"}
                alt={hotel.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-bold">{hotel.name}</h3>
                <p className="text-sm text-gray-600">{destino}</p>
                {hotel.overall_rating && (
                  <p className="text-yellow-500">
                    {"★".repeat(Math.round(hotel.overall_rating))}
                    {hotel.overall_rating && ` ${hotel.overall_rating}`}
                  </p>
                )}
              </div>
            </div>
            <h4 className="font-semibold mb-2">Desglose de precio</h4>
            <div className="flex justify-between text-sm mb-1">
              <span>Precio por noche</span>
              <span>{hotel.rate_per_night?.lowest || "N/A"}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Número de noches</span>
              <span>{calcularNoches()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
              <span>Total</span>
              <span className="text-green-700">{hotel.total_rate?.lowest || hotel.rate_per_night?.lowest || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              {/* Ícono de éxito */}
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
                <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Reserva Confirmada!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Tu reserva ha sido procesada exitosamente. Recibirás un email de confirmación en breve.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Hotel:</strong> {hotel.name}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Check-in:</strong> {checkin}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Check-out:</strong> {checkout}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Huéspedes:</strong> {guests}
                </p>
              </div>
              
              <button
                onClick={handleModalClose}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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