import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: [ "200", "300", "400", "500", "700"],
  subsets: ["latin"],
});


export const metadata = {
  title: "Hopper | Book Hotels, Flights, Car Rentals & More",
  description: "Esta pagina es un clon de la pagina Hopper.com",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
