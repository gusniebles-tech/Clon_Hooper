import HeaderHotel from "@/components/HeaderHotels";
import GalleryModal from "@/components/GalleryModal";
import { Share, ShieldCheck, Wifi, Car, Snowflake, Utensils, Coffee, Dumbbell, Dog, Bath, Hotel, Beer, TreePalm, Plane } from "lucide-react";
import ReservarButton from "@/components/ReservarButton";
import "../../styles/DetailsPage.css"
import "../../styles/HotelClientPage.css";


async function getHotel(property_token, searchParams = {}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const params = new URLSearchParams({
        property_token,
        destino: searchParams.destino || "",
        checkin: searchParams.checkin || "",
        checkout: searchParams.checkout || "",
        guests: searchParams.guests || "1"
    });

    const fullUrl = `${baseUrl}/api/hotels?${params.toString()}`;

    try {
        const res = await fetch(fullUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        return data.ok && data.hotel ? data.hotel : null;
    } catch (error) {
        console.error("Error al obtener hotel:", error);
        return null;
    }
}

const amenityIcons = {
    "Free Wi-Fi": Wifi,
    "Parking ($)": Car,
    "Free parking": Car,
    "Air conditioning": Snowflake,
    "Breakfast ($)": Coffee,
    "Restaurant": Utensils,
    "Fitness center": Dumbbell,
    "Pet-friendly": Dog,
    "Outdoor pool": Bath,
    "5-star hotel": Hotel,
    "Bar": Beer,
    "Beach access": TreePalm,
    "Aiport shuttle": Plane,
};

const allowedAmenities = [
    "5-star hotel",
    "Breakfast ($)",
    "Free Wi-Fi",
    "Free parking",
    "Air conditioning",
    "Fitness center",
    "Pet-friendly",
    "Restaurant",
    "Room service",
    "Parking ($)",
    "Aiport shuttle",
    "Bar",
];

export default async function HotelDetalle({ params, searchParams }) {
    const { i } = await params;
    const parametros = await searchParams;
    const hotel = await getHotel(i, parametros);

    if (!hotel) {
        return <p className="p-6">Hotel no encontrado</p>;
    }

    return (
        <>
            <HeaderHotel />
            <main className="w-[65vw] mx-auto px-6 py-8 DPwidth">
                {/* Nombre + dirección */}
                <section className="flex justify-between">
                    <h1 className="text-3xl font-bold flex items-center">{hotel.name}</h1>
                    <div className="flex items-center">
                        <Share size={20} className="me-3" />
                        <ReservarButton property_token={hotel.property_token} />
                    </div>
                </section>

                {/* Galería */}
                <section className="mt-6 grid grid-cols-2 gap-2 imgPrin relative">
                    {/* Imagen principal */}
                    <div className="">
                        <img
                            src={hotel.images[0]}
                            alt={hotel.name}
                            className="rounded-lg object-cover w-full h-auto"
                        />

                        <div className="hidden">
                            {hotel.images.length > 5 && (
                                <div className="absolute right-4 bottom-4 rounded-lg overflow-hidden cursor-pointer w-auto">
                                    <GalleryModal images={hotel.images} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Grid lateral */}
                    <div className="relative grid grid-cols-2 gap-2 imagesDnone">
                        {hotel.images.slice(1, 5).map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`${hotel.name} ${i}`}
                                className="rounded-lg object-cover w-full h-full"
                            />
                        ))}

                        {/* Ver galería */}
                        {hotel.images.length > 5 && (
                            <div className="absolute right-4 bottom-4 rounded-lg overflow-hidden cursor-pointer w-auto">
                                <GalleryModal images={hotel.images} />
                            </div>
                        )}
                    </div>
                </section>

                {/* Descripción */}
                <section className="mt-6 flex descripcion">
                    <div className="text-[1.4rem] text-black font-medium leading-relaxed pr-6">
                        <p className="">
                            Vive unas vacaciones inolvidables en un hotel pensado para tu descanso y diversión. Disfruta de una refrescante piscina al aire libre, ejercítate en el gimnasio disponible las 24 horas o simplemente relájate con todas las comodidades que necesitas, incluyendo wifi gratuito en todas las áreas y servicios de conserjería para hacer tu estadía más fácil.
                        </p>
                        <p className="mt-4">
                            Comienza el día con un delicioso desayuno tipo bufé, incluido en tu alojamiento, y aprovecha el restaurante del hotel con variadas opciones para todos los gustos.
                        </p>
                        <p className="mt-4">
                            Al final del día, descansa en habitaciones modernas y acogedoras, equipadas con aire acondicionado, televisión LED, camas confortables con ropa de cama premium y duchas tipo lluvia que te harán sentir renovado.
                        </p>
                        <p className="mt-4">
                            Gracias a su excelente ubicación, estarás a pocos minutos de los principales atractivos turísticos de la ciudad, lo que convierte al hotel en el lugar ideal para disfrutar de tu estadía tanto de día como de noche.
                        </p>
                    </div>

                    {/* Servicios */}
                    <aside className="">
                        <h2 className="text-xl font-semibold mb-4">Servicios</h2>
                        <div className=" text-gray-700 amenities540px">
                            {hotel.amenities &&
                                hotel.amenities
                                    .filter((amenity) => allowedAmenities.includes(amenity))
                                    .slice(0, 8)
                                    .map((amenity, i) => {
                                        const Icon = amenityIcons[amenity] || ShieldCheck;
                                        return (
                                            <div key={i} className="flex items-center gap-8 my-2 carat">
                                                <Icon className="w-8 h-8" />
                                                <span className="text-[1.2rem] font-medium">{amenity}</span>
                                            </div>
                                        );
                                    })}
                        </div>
                    </aside>
                </section>
            </main>
        </>
    );
}