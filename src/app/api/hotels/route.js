import { NextResponse } from "next/server";

const ciudades = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Cartagena",
    "Barranquilla",
    "Santa Marta",
    "Bucaramanga",
    "Manizales",
    "Pereira",
    "Cúcuta",
];

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const destino = searchParams.get("destino")
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const guests = searchParams.get("guests");
    const sugerencias = searchParams.get("sugerencias")

    if (sugerencias && destino) {
        const match = ciudades.filter((c) =>
            c.toLocaleLowerCase().includes(destino.toLocaleLowerCase())
        )
        return NextResponse.json({ ok: true, ciudades: match });
    }

    if (!destino) {
        return NextResponse.json(
            { error: "Ruta no encontrada" },
            { status: 400 }
        )
    }

    const parametros = new URLSearchParams({
        engine: "google_hotels",
        q: destino,
        check_in_date: checkin || "2025-09-20",
        check_out_date: checkout || "2025-09-22",
        adults: guests || "1",
        api_key: process.env.SERPAPI_KEY || "",
    })

    try {
        const response = await fetch(`https://serpapi.com/search.json?${parametros.toString()}`);
        if (!response.ok) {
            const errorData = await response.text();
            console.error("Error SerpApi:", errorData);
            throw new Error("Falla la conexión con SerpApi");
        }

        const data = await response.json();

        const hoteles = (data.properties || []).map((hotel) => ({
            name: hotel.title,  
            description: hotel.description,
            link: hotel.link,
            images: hotel.images || [],
            overall_rating: hotel.rating,
            reviews: hotel.reviews,
            total_rate: hotel.total_rate,
            deal: hotel.deal,
            deal_description: hotel.deal_description,

        }));

        return NextResponse.json({ ok: true, hoteles});
    } catch (error) {
        console.error("Error en la consulta de hoteles: ", error.message);
        return NextResponse.json(
            { ok: false, error: "Error en la consulta de los hoteles en SerpApi."},
            { status: 500}
        )
    }
}