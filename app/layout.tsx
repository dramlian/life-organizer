import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import NavbarClient from "./components/navbar/NavbarClient";
import Footer from "./components/footer/Footer";
import Providers from "./components/Providers";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Life Organizer",
  description: "Life Organizer next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body
        className={`${pressStart2P.variable} antialiased`}
      >
        <Providers>
          <NavbarClient />
          <div>
            {children}
          </div>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
