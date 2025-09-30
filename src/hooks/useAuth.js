"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null))

    // Escuchar cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function loginWithEmail(email, password) {
    return supabase.auth.signInWithPassword({ email, password })
  }

  async function loginWithGoogle() {
    return supabase.auth.signInWithOAuth({ provider: "google" })
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return { user, loginWithEmail, loginWithGoogle, logout }
}
