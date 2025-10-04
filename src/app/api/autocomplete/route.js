import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json({ sugerencias: [] });
    }

    try {
        const serpApiKey = process.env.SERPAPI_KEY;
        
        if (!serpApiKey) {
            console.error('SERPAPI_KEY no configurada');
            return NextResponse.json({ 
                sugerencias: [],
                error: 'API key no configurada'
            }, { status: 500 });
        }

        const params = new URLSearchParams({
            engine: 'google_hotels',
            q: query,
            gl: 'co', 
            hl: 'es',
            api_key: serpApiKey
        });

        const url = `https://serpapi.com/search.json?${params.toString()}`;
        console.log('Consultando SerpAPI...');

        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error SerpAPI:', response.status, errorText);
            throw new Error(`SerpAPI error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta recibida');

        let sugerencias = [];

        if (data.brands && data.brands.length > 0) {
            sugerencias = data.brands.map(brand => brand.name).slice(0, 8);
            console.log('Sugerencias de brands:', sugerencias);
        }
        
        if (sugerencias.length === 0 && data.properties) {
            const ciudades = new Set();
            data.properties.forEach(property => {
                if (property.name) {
                    const partes = property.name.split(',');
                    if (partes.length > 1) {
                        ciudades.add(partes[partes.length - 1].trim());
                    }
                }
            });
            sugerencias = Array.from(ciudades).slice(0, 8);
            console.log('Sugerencias de propiedades:', sugerencias);
        }

        if (sugerencias.length === 0) {
            const ciudadesPopulares = [
                "Bogotá",
                "Medellín", 
                "Cali",
                "Cartagena",
                "Barranquilla",
                "Santa Marta",
                "Bucaramanga",
                "Pereira",
                "Manizales",
                "San Andrés"
            ];
            
            sugerencias = ciudadesPopulares.filter(ciudad => 
                ciudad.toLowerCase().includes(query.toLowerCase())
            );
            console.log('Sugerencias de fallback:', sugerencias);
        }

        return NextResponse.json({ 
            sugerencias,
            debug: {
                query,
                total: sugerencias.length,
                hasBrands: !!(data.brands && data.brands.length > 0),
                hasProperties: !!(data.properties && data.properties.length > 0)
            }
        });

    } catch (error) {
        console.error('Error completo:', error);
        
        const ciudadesPopulares = [
            "Bogotá",
            "Medellín",
            "Cali", 
            "Cartagena",
            "Barranquilla",
            "Santa Marta",
            "Bucaramanga",
            "Pereira",
            "Manizales",
            "San Andrés"
        ];
        
        const sugerenciasFallback = ciudadesPopulares.filter(ciudad =>
            ciudad.toLowerCase().includes(query.toLowerCase())
        );

        return NextResponse.json({ 
            sugerencias: sugerenciasFallback,
            error: error.message,
            fallback: true
        });
    }
}