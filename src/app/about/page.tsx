'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

interface CustomImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    layoutFill?: boolean;
    objectCover?: boolean;
}

const CustomImage = ({
    src,
    alt,
    className = "",
    width,
    height,
    layoutFill = false,
    objectCover = false,
}: CustomImageProps) => {
    if (layoutFill) {
        return (
            <img
                src={src}
                alt={alt}
                className={`absolute inset-0 w-full h-full ${objectCover ? "object-cover" : "object-contain"} ${className}`}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${objectCover ? "object-cover" : "object-contain"} ${className}`}
        />
    );
};

const images = [
    { src: "/image/foto1.png", alt: "Karyawan 1", id: 1 },
    { src: "/image/foto2.png", alt: "Karyawan 2", id: 2 },
    { src: "/image/foto3.JPG", alt: "Karyawan 3", id: 3 },
    { src: "/image/foto4.jpg", alt: "Karyawan 4", id: 4 },
    { src: "/image/foto5.jpg", alt: "Karyawan 5", id: 5 },
    { src: "/image/foto6.jpg", alt: "Karyawan 6", id: 6 },
    { src: "/image/foto7.png", alt: "Karyawan 7", id: 7 },
    { src: "/image/foto8.png", alt: "Karyawan 8", id: 8 },
];

export default function AboutPage() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Mencari:", searchTerm);
  
    };

    const COMPANY_NAME = "LUMÉRA";
    const PRIMARY_BLUE = "#1C4E80"; // Warna biru dari header dashboard

    return (
        <div className="font-sans bg-white relative">
            {/* ============== HEADER NAVIGASI BIRU (Sticky) ============== */}
            <header className="bg-[#1C4E80] text-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-10">
                        <a href="/" className="flex items-center space-x-2">
                            <CustomImage
                                src="/image/moon2.png" 
                                alt="Logo"
                                width={25}
                                height={25}
                                className="dark:invert"
                            />
                            <span className="font-bold text-lg">{COMPANY_NAME}</span>
                        </a>

                        <nav className="hidden md:flex space-x-6 text-sm">
                            <Link href="/about" className="font-bold underline underline-offset-4">About Us</Link>
                            <Link href="/brands" className="hover:underline">Brands</Link>
                   
                        </nav>
                    </div>

                    <div className="relative flex items-center space-x-4">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-1 focus:outline-none"
                            aria-label="Toggle search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* ============== SEARCH BAR SIDE PANEL ============== */}
            <div className={`fixed top-0 left-0 h-full bg-[#1C4E80] w-full max-w-sm shadow-lg p-6 z-40 text-white transition-transform duration-300 ease-in-out
                            ${isSearchOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <form onSubmit={handleSearchSubmit} className="h-full flex flex-col">
                    <div className="flex justify-start items-center mb-6 text-xl">
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(false)}
                            className="text-white hover:text-gray-300 focus:outline-none mr-4"
                            aria-label="Close search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2 className="font-semibold">Enter search keyword</h2>
                    </div>
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Enter search keyword"
                            className="w-full pl-10 pr-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-[#1C4E80] text-white placeholder-gray-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto">
                        {searchTerm && (
                            <p className="text-gray-300 text-sm">Hasil pencarian untuk: "{searchTerm}"</p>
                        )}
                        {searchTerm === "SCare" && (
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="block py-2 px-3 hover:bg-blue-700 rounded">SCare Purifying Cleanser</a></li>
                                <li><a href="#" className="block py-2 px-3 hover:bg-blue-700 rounded">SCare Hydrating Serum</a></li>
                                <li><a href="#" className="block py-2 px-3 hover:bg-blue-700 rounded">SCare Daily Protector SPF 30</a></li>
                            </ul>
                        )}
                        {searchTerm && searchTerm !== "SCare" && (
                            <p className="mt-4 text-gray-400">Tidak ada hasil ditemukan untuk "{searchTerm}".</p>
                        )}
                        {!searchTerm && (
                            <p className="mt-4 text-gray-400">Ketik kata kunci untuk memulai pencarian.</p>
                        )}
                    </div>
                </form>
            </div>

            {/* ========== HERO SECTION ========== */}
            <section className="relative w-full h-screen overflow-hidden">
                <div className="grid grid-cols-4 grid-rows-2 w-full h-full">
                    {images.map((img, index) => (
                        <div key={img.id} className="relative w-full h-full">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                style={{ objectFit: "cover" }}
                                priority={index < 4}
                            />
                            <div className="absolute inset-0 bg-black opacity-30 hover:opacity-10 transition duration-300" />
                        </div>
                    ))}
                </div>

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6 z-10">
                    <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 drop-shadow-xl">
                        About Luméra
                    </h1>
                    <p className="text-xl sm:text-2xl leading-relaxed font-medium drop-shadow-lg max-w-3xl">
                        Luméra is an Indonesian skincare brand born from the belief that
                        beauty begins with self-care and confidence — powered by nature and
                        perfected by science.
                    </p>
                </div>
            </section>

            {/* ========== OUR VISION SECTION ========== */}
            <section className="bg-white py-20 px-8 sm:px-24 text-gray-800">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8" style={{ color: PRIMARY_BLUE }}>Our Vision</h2>
                    <p className="text-lg leading-relaxed">
                        To be the leading skincare company that empowers individuals to
                        embrace their natural beauty through safe, effective, and
                        sustainable products — enhancing confidence and well-being every
                        day.
                    </p>
                </div>
            </section>

            {/* ========== OUR MISSION SECTION ========== */}
            <section className="bg-gray-50 py-20 px-8 sm:px-24 text-gray-800">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12" style={{ color: PRIMARY_BLUE }}>Our Mission</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-left">
                        <div className="flex items-start gap-4">
                            <span className="text-4xl" style={{ color: PRIMARY_BLUE }}>💧</span>
                            <div>
                                <h3 className="text-xl font-semibold" style={{ color: PRIMARY_BLUE }}>
                                    Innovating Natural Formulas
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    We combine advanced dermatological science with natural
                                    ingredients to create gentle, effective skincare for all skin
                                    types.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="text-4xl" style={{ color: PRIMARY_BLUE }}>🌿</span>
                            <div>
                                <h3 className="text-xl font-semibold" style={{ color: PRIMARY_BLUE }}>
                                    Commitment to Sustainability
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Luméra is dedicated to eco-friendly sourcing, recyclable
                                    packaging, and cruelty-free practices to protect our planet.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="text-4xl" style={{ color: PRIMARY_BLUE }}>🤝</span>
                            <div>
                                <h3 className="text-xl font-semibold" style={{ color: PRIMARY_BLUE }}>
                                    Empowering Local Communities
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    We collaborate with local suppliers and communities to promote
                                    inclusive growth and shared success.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="text-4xl" style={{ color: PRIMARY_BLUE }}>✨</span>
                            <div>
                                <h3 className="text-xl font-semibold" style={{ color: PRIMARY_BLUE }}>
                                    Building Confidence
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    We strive to inspire confidence in every individual by helping
                                    them feel good in their own skin — naturally and beautifully.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Sederhana */}
            <footer className="bg-gray-800 text-white p-6 text-center text-sm">
                <p>© {new Date().getFullYear()} Luméra. All rights reserved.</p>
                <p className="mt-2 text-gray-400">
                    Empowering beauty, embracing light, and inspiring confidence every day.
                </p>
            </footer>
        </div>
    );
}