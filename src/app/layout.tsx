import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
import Intro from './components/intro'; 
import About from './components/About'
import Skill from './components/Skill'
import Offer from './components/Offer'
import Exp from './components/Exp';
import Recomnd from './components/Recomnd';
import Hire from './components/Hire';
import Other from './components/Other'
import Footer from './components/Footer'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Januda",
  description: "Developer,Traveller",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Intro />
        <About />
        <Skill />
        <Offer />
        <Exp />
        <Recomnd />
        <Hire />
        <Other />
        <Footer />
        {/* You can also add Footer here if you have one */}
      </body>
    </html>
  );
}