// src/app/components/MisViajesContent.jsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Calendar, Users, MapPin, Trash2, Star } from "lucide-react";

// Componente interno que usa los hooks
export default function MisViajesContent() {
  const router = useRouter();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reservaToDelete, setReservaToDelete] = useState(null);
  

  useEffect(() => {
    const checkUserAndFetchReservas = async () => {
      try {
        // Verificar usuario autenticado
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !currentUser) {
          router.push("/");
          return;
        }

        setUser(currentUser);

        // Obtener reservas del usuario
        const { data: reservasData, error: reservasError } = await supabase
          .from("reservas")
          .select("*")
          .eq("user_id", currentUser.id)
          .order("fecha_creacion", { ascending: false });

        if (reservasError) {
          console.error("Error al cargar reservas:", reservasError);
          return;
        }

        // Obtener imágenes de los hoteles
        const reservasConImagenes = await Promise.all(
          reservasData.map(async (reserva) => {
            try {
              // Hacer fetch a la API para obtener imagen del hotel
              const params = new URLSearchParams({
                property_token: reserva.property_token,
                destino: reserva.destino || "",
                checkin: reserva.fecha_entrada || "",
                checkout: reserva.fecha_salida || "",
                guests: reserva.numero_huespedes?.toString() || "1"
              });

              const response = await fetch(`/api/hotels?${params.toString()}`);
              if (response.ok) {
                const data = await response.json();
                if (data.ok && data.hotel) {
                  return {
                    ...reserva,
                    imagen: data.hotel.images?.[0] || null,
                    overall_rating: data.hotel.overall_rating || null
                  };
                }
              }
            } catch (error) {
              console.error("Error al obtener imagen del hotel:", error);
            }
            return { ...reserva, imagen: null, overall_rating: null };
          })
        );

        setReservas(reservasConImagenes);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserAndFetchReservas();
  }, [router]);

  const handleDeleteClick = (reserva) => {
    setReservaToDelete(reserva);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reservaToDelete) return;

    setDeletingId(reservaToDelete.id);
    
    try {
      const { error } = await supabase
        .from("reservas")
        .delete()
        .eq("id", reservaToDelete.id)
        .eq("user_id", user.id);

      if (error) throw error;

      // Actualizar la lista de reservas
      setReservas(reservas.filter(r => r.id !== reservaToDelete.id));
      setShowDeleteModal(false);
      setReservaToDelete(null);
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      alert("Error al eliminar la reserva. Por favor, intenta nuevamente.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "N/A";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const calcularNoches = (entrada, salida) => {
    if (!entrada || !salida) return 0;
    const fechaEntrada = new Date(entrada);
    const fechaSalida = new Date(salida);
    const diferencia = fechaSalida - fechaEntrada;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl">Cargando tus viajes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Mis Viajes</h1>
        <p className="text-gray-600 text-lg">
          Gestiona todas tus reservas en un solo lugar
        </p>
      </div>

      {reservas.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No tienes reservas aún</h2>
          <p className="text-gray-600 mb-6">
            Comienza a planificar tu próximo viaje
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Buscar hoteles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservas.map((reserva) => (
            <div
              key={reserva.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Imagen del hotel */}
              <div className="relative h-48">
                <img
                  src={reserva.imagen || "https://placehold.co/400x300?text=Hotel"}
                  alt={reserva.hotel_nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    reserva.estado === 'confirmada' || reserva.estado === 'confirmado'
                      ? 'bg-green-100 text-green-800'
                      : reserva.estado === 'pendiente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {reserva.estado === 'confirmado' ? 'Confirmada' : 
                     reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold line-clamp-2 flex-1">
                    {reserva.hotel_nombre}
                  </h3>
                  {reserva.overall_rating && (
                    <div className="flex items-center ml-2 flex-shrink-0">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-semibold">{reserva.overall_rating}</span>
                    </div>
                  )}
                </div>

                {/* Destino */}
                {reserva.destino && (
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{reserva.destino}</span>
                  </div>
                )}

                {/* Fechas */}
                <div className="flex items-start text-gray-700 mb-3">
                  <Calendar size={16} className="mr-2 mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">
                      {formatFecha(reserva.fecha_entrada)}
                    </div>
                    <div className="text-gray-500">
                      hasta {formatFecha(reserva.fecha_salida)}
                    </div>
                    <div className="text-gray-500 mt-1">
                      {calcularNoches(reserva.fecha_entrada, reserva.fecha_salida)} {
                        calcularNoches(reserva.fecha_entrada, reserva.fecha_salida) === 1 
                          ? 'noche' 
                          : 'noches'
                      }
                    </div>
                  </div>
                </div>

                {/* Huéspedes */}
                <div className="flex items-center text-gray-600 mb-4">
                  <Users size={16} className="mr-2" />
                  <span className="text-sm">
                    {reserva.numero_huespedes} {
                      reserva.numero_huespedes === 1 ? 'huésped' : 'huéspedes'
                    }
                  </span>
                </div>

                {/* Precio y botón */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-sm text-gray-500">Precio total</div>
                    <div className="text-xl font-bold text-green-600">
                      {reserva.precio_total}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(reserva)}
                    disabled={deletingId === reserva.id}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Cancelar reserva"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && reservaToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¿Cancelar reserva?
              </h3>
              
              <p className="text-gray-600 mb-6">
                Estás a punto de cancelar tu reserva en <strong>{reservaToDelete.hotel_nombre}</strong>. Esta acción no se puede deshacer.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setReservaToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
                  disabled={deletingId}
                >
                  No, mantener
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deletingId}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50"
                >
                  {deletingId ? "Cancelando..." : "Sí, cancelar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}