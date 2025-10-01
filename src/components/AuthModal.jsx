"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthModal({ onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Login con correo
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            onClose();
        }

        setLoading(false);
    };

    // Registro con correo
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: email.split("@")[0], // Nombre genérico
                    avatar_url: "/default-avatar.png", // 👈 logo genérico
                },
            },
        });

        if (error) {
            setError(error.message);
        } else {
            onClose();
        }

        setLoading(false);
    };

    // Login con Google
    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) setError(error.message);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="bg-white p-6 rounded-[1.5rem] w-[375px]">
                <h2 className="text-[2.4rem] font-bold mb-8 text-center">Inicia sesión o regístrate</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-4 rounded-[1rem] mb-4 text-[1.4rem] font-medium"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-4 rounded-[1rem] mb-4 text-[1.4rem] font-medium" 
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-4 rounded-[1rem] mb-4 text-[1.4rem] font-medium"
                    />

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="bg-blue-600 text-white py-4 rounded-[1rem] hover:bg-blue-700 text-[1.4rem] font-medium mb-4"
                    >
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>
                    <button
                        onClick={handleSignup}
                        disabled={loading}
                        className="bg-gray-600 text-white py-4 rounded-[1rem] hover:bg-gray-700 text-[1.4rem] font-medium mb-4"
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>

                <div className="mt-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-red-500 text-white py-4 rounded-[1rem] hover:bg-red-600 text-[1.4rem] font-medium mb-4"
                    >
                        Ingresar con Google
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-gray-500 hover:underline text-[1.4rem] font-medium"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
