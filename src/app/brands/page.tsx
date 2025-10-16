'use client';

import { useState } from 'react';

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

export default function Home() {
    const [isSearchOpen, setIsSearchOpen] = useState(false); 
    const [searchTerm, setSearchTerm] = useState(''); 

    // Fungsi placeholder untuk menangani submit pencarian
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Mencegah reload halaman
        console.log("Mencari:", searchTerm);
    };

    const COMPANY_NAME = "LUMÉRA";

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

                        {/* Menu Navigasi - Sekarang di sebelah logo */}
                        <nav className="hidden md:flex space-x-6 text-sm">
                            <a href="/about" className="hover:underline">About Us</a>
                            <a href="#" className="font-bold underline underline-offset-4">Brands</a>
                       
                           
                        </nav>
                    </div>

                    {/* Ikon Pencarian dan Search Bar Overlay - Tetap di sisi kanan */}
                    <div className="relative flex items-center space-x-4"> 
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-1 focus:outline-none" 
                            aria-label="Toggle search"
                        >
                            {/* Icon SVG dari kode referensi */}
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

                    {/* Area untuk menampilkan hasil pencarian */}
                    <div className="flex-grow overflow-y-auto">
                        {searchTerm && (
                            <p className="text-gray-300 text-sm">Hasil pencarian untuk: "{searchTerm}"</p>
                        )}
                        {/* Contoh Placeholder Hasil (akan diganti dengan data sesungguhnya) */}
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


            {/* ============== BAGIAN 1: BRANDS HERO SECTION ============== */}
            <section className="relative h-[60vh] overflow-hidden bg-gray-200">
                <CustomImage
                    src="/image/makeup.png"
                    alt="Paragon Brand Products"
                    layoutFill={true}
                    objectCover={true}
                    className="opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-8xl font-black tracking-widest z-10">
                        BRANDS
                    </h1>
                </div>
            </section>

            {/* ============== BAGIAN 2: BRANDS LOGO SECTION (Brand List) ============== */}
            <section className="py-16 bg-white border-b">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-center text-xl font-semibold mb-10 text-gray-500">MEMBER OF {COMPANY_NAME}</h2>

                    {/* LOGO GRID DENGAN 3 KOLOM */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center max-w-4xl mx-auto">

                        {/* Logo Brand List (SCare, BodyC, FM) */}
                        <div className="text-center">
                            <CustomImage src="/image/candle.jpg" alt="SCare Logo" width={100} height={100} className="object-contain" />
                            <p className="mt-2 text-xs text-gray-400 font-bold">SCare</p>
                        </div>
                        <div className="text-center">
                            <CustomImage src="/image//bcare.jpg" alt="BodyC Logo" width={100} height={100} className="object-contain" />
                            <p className="mt-2 text-xs text-gray-400 font-bold">BodyC</p>
                        </div>
                        <div className="text-center">
                            <CustomImage src="/image/FM.jpg" alt="FM Logo" width={100} height={100} className="object-contain" />
                            <p className="mt-2 text-xs text-gray-400 font-bold">FM</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============== BAGIAN 3: DETAIL BRAND SCARE (Skin Solution) ============== */}
            <section className="py-20 bg-gray-50"> 

                {/* Banner Detail SCARE */}
                <div className="relative h-[50vh] overflow-hidden">
                    <CustomImage
                        src="/image/bg-web.jpg"
                        alt="SCare Purifying Series"
                        layoutFill={true}
                        objectCover={true}
                        className="brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-8xl font-extrabold md:text-9xl">SCare</h2>
                    </div>
                </div>

                {/* Deskripsi Brand SCARE */}
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <p className="text-lg text-gray-700 leading-relaxed mb-10">
                        SCare focuses on **advanced skin purification** using clinically tested, powerful natural extracts. We provide targeted solutions
                        for urban skin challenges, including pollution, acne, and excessive sebum. SCARE believes that confidence begins with a healthy,
                        clear, and well-maintained complexion. Explore our exclusive purifying and restorative lines designed for daily urban protection.
                    </p>

                    {/* Tombol Visit & Shop */}
                    <a
                        href="https://www.wardahbeauty.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 border-2 border-pink-500 text-pink-600 font-medium rounded-md hover:bg-pink-50 transition duration-300"
                    >
                        Visit & Shop →
                    </a>
                </div>

            </section>

            {/* ============== BAGIAN 4: DETAIL BRAND BODY C (Body Wellness) ============== */}
            <section className="py-20 bg-white">

                <div className="relative h-[50vh] overflow-hidden">
                    <CustomImage
                        src="/image/bg-web2.jpg" 
                        alt="BodyC Bodycare Series"
                        layoutFill={true}
                        objectCover={true}
                        className="brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-8xl font-extrabold md:text-9xl">BodyC</h2>
                    </div>
                </div>

                {/* Deskripsi Brand BodyC */}
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <p className="text-lg text-gray-700 leading-relaxed mb-10">
                        BodyC is dedicated to full-body wellness, emphasizing deep **hydration and restorative care**. Our formulas, rich in natural oils and essential extracts, provide lasting moisture and protection for the body largest organ. We transform daily routines into moments of self-care, ensuring your skin feels soft, supple, and beautifully revitalized from head to toe.
                    </p>

                    {/* Tombol Visit & Shop */}
                    <a
                        href="https://www.makeoverforall.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 border-2 border-blue-500 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition duration-300"
                    >
                        Visit & Shop →
                    </a>
                </div>

            </section>

            {/* ============== BAGIAN 5: DETAIL BRAND FM (Fashion Makeup) ============== */}
            <section className="py-20 bg-gray-50">

                {/* Banner Detail FM */}
                <div className="relative h-[50vh] overflow-hidden">
                    <CustomImage
                        src="/image/bg-web3.jpg" // PASTIKAN FILE INI ADA di folder PUBLIC!
                        alt="FM Makeup Collection"
                        layoutFill={true}
                        objectCover={true}
                        className="brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-8xl font-extrabold md:text-9xl">FM</h2>
                    </div>
                </div>

                {/* Deskripsi Brand FM */}
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <p className="text-lg text-gray-700 leading-relaxed mb-10">
                        FM stands for Face Makeup, our vibrant collection dedicated to expressive artistry and professional finishes.
                        We offer highly pigmented, blendable products, from foundations to vibrant eye palettes, designed to unlock your creative potential.
                        FMs long-lasting formulas ensure your personalized looks stay flawless and dynamic all day, every day.
                    </p>

                    {/* Tombol Visit & Shop */}
                    <a
                        href="https://www.eminacosmetics.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 border-2 border-red-500 text-red-600 font-medium rounded-md hover:bg-red-50 transition duration-300"
                    >
                        Visit & Shop →
                    </a>
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