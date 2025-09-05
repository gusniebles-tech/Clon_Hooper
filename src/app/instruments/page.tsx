import { createClient } from "../../../utils/supabase/server";
import { cookies } from 'next/headers'

export default async function Page() {
    const cookieStore = cookies()
    const supabase = await createClient()

    const { data: alojamientos, error } = await supabase.from("alojamientos").select();

    console.log(alojamientos);

    if (error) console.error("Error al consultar:", error);

}
