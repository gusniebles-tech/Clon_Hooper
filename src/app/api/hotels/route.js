import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const destino = searchParams.get("destino");
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const guests = searchParams.get("guests");
    const sugerencias = searchParams.get("sugerencias");
    const property_token = searchParams.get("property_token");

    if (!destino && !property_token) {
        return NextResponse.json(
            { error: "Ruta no encontrada" },
            { status: 400 }
        );
    }

    const parametros = new URLSearchParams({
        engine: "google_hotels",
        q: destino,
        check_in_date: checkin || "2025-09-20",
        check_out_date: checkout || "2025-09-22",
        adults: guests || "1",
        api_key: process.env.SERPAPI_KEY || "",
    });

    try {
        const response = await fetch(`https://serpapi.com/search.json?${parametros.toString()}`);
        if (!response.ok) {
            const errorData = await response.text();
            console.error("Error SerpApi:", errorData);
            throw new Error("Falla la conexión con SerpApi");
        }

        const data = await response.json();

        const hoteles = (data.properties || []).map((hotel) => ({
            property_token: hotel.property_token,
            name: hotel.name,
            description: hotel.description,
            link: hotel.link,
            images: (hotel.images || []).map((img) => img.thumbnail || img.original_image),
            overall_rating: hotel.overall_rating,
            reviews: hotel.reviews,
            ratings_breakdown: hotel.ratings || [],
            rate_per_night: hotel.rate_per_night || null,
            total_rate: hotel.total_rate,
            deal: hotel.deal,
            deal_description: hotel.deal_description,
            amenities: hotel.amenities || [],
        }));

        if (property_token) {
            const hotel = hoteles.find((h) => h.property_token === property_token);
            if (!hotel) {
                return NextResponse.json(
                    { error: "Hotel no encontrado"},
                    { status: 404 }
                );
            }
            return NextResponse.json({ ok: true, hotel });
        }

        return NextResponse.json({ ok: true, hoteles });
    } catch (error) {
        console.error("Error en la consulta de hoteles: ", error.message);
        return NextResponse.json(
            { ok: false, error: "Error en la consulta de los hoteles en SerpApi." },
            { status: 500 }
        );
    }
}