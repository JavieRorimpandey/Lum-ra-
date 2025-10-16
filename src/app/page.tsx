'use client';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";

// Komponen untuk animasi angka counter
const AnimatedCounter = ({ endValue, duration = 2000, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            let startValue = 0;
            const numericEndValue = parseInt(endValue.toString().replace(/[^0-9]/g, ''), 10);

            if (isNaN(numericEndValue)) {
                setCount(endValue);
                return;
            }

            const incrementTime = 50;
            const totalSteps = duration / incrementTime;
            const stepValue = numericEndValue / totalSteps;
            let currentCount = 0;

            const timer = setInterval(() => {
                currentCount += stepValue;
                if (currentCount < numericEndValue) {
                    setCount(Math.floor(currentCount));
                } else {
                    setCount(numericEndValue);
                    clearInterval(timer);
                }
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isVisible, endValue, duration]);

    const displayValue = `${prefix}${count}${suffix}`;
    const finalDisplay = endValue.toString().includes('>') && count === parseInt(endValue.toString().replace(/[^0-9]/g, ''), 10)
        ? `>${count}`
        : displayValue;

    return <span ref={ref}>{finalDisplay}</span>;
};

// Komponen Gambar Kustom yang kini menggunakan Next.js Image
interface CustomImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    layoutFill?: boolean;
    objectCover?: boolean;
    priority?: boolean;
    initialScale?: number; // Tambahan untuk efek zoom in
    animateScale?: number; // Tambahan untuk efek zoom in
}

const CustomImage = ({
    src,
    alt,
    className = "",
    width,
    height,
    layoutFill = false,
    objectCover = false,
    priority = false,
    initialScale = 1, 
    animateScale = 1.05,
}: CustomImageProps) => {
    const objectFitClass = objectCover ? "object-cover" : "object-contain";

    if (layoutFill) {
        return (
            <motion.div
                initial={{ scale: initialScale }}
                animate={{ scale: animateScale }}
                transition={{ duration: 0.5, ease: "easeInOut" }} // Durasi dan ease untuk efek zoom
                className="absolute inset-0"
            >
                <NextImage
                    src={src}
                    alt={alt}
                    fill={true}
                    className={`${objectFitClass} ${className}`}
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </motion.div>
        );
    }

    return (
        <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${objectFitClass} ${className}`}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    );
};

// Data untuk setiap brand
const brandData = [
    {
        name: "Wardah",
        image: "/image/Wardah.jpg",
        description:
            "Wardah is a pioneer of halal cosmetics in Indonesia that combines natural purity with a halal, modern, reliable process to produce high-quality halal products with international innovation standards. Through love, respect and appreciation, we are committed to getting women love themselves and making true beauty shines.",
        link: "https://www.wardahbeauty.com/", 
    },
    {
        name: "Make Over",
        image: "/image/make-over.jpg",
        description:
            "There is no limit in defining your beauty for Make Over, because beauty belongs to all women. Set yourself free and show the world that freedom and expression are words beyond communication. It's time to live in a world where only beauty dominates us all.",
        link: "https://www.makeoverforall.com/",
    },
    {
        name: "Emina",
        image: "/image/emina2.jpg",
        description:
            "For Emina, every day is a new opportunity to be greeted with enthusiasm and passion. Emina's range of skincare and make-up are very easy to apply for teenagers and new makeup users. Emina wants to you radiate positive new energy every day with fresh and healthy skin!",
        link: "https://www.eminacosmetics.com/", 
    },
    {
        name: "Kahf",
        image: "/image/Kahf.jpg",
        description:
            "Kahf is a halal grooming brand for men and inspired by nature with natural, halal, and dermatologically tested ingredients. Men self-care products which prepare each user to discover and have positive impact on their surroundings from the very start of the day.",
        link: "https://www.kahfeveryday.com/"
    },
    {
        name: "Centella",
        image: "/image/centella.jpg",
        description:
            "Reveal your skin’s natural glow with Centella.Infused with Edelweiss Extract and Alpha Arbutin, it helps brighten and even out your skin tone while fading dark spots.Enjoy a clearer, smoother, and more radiant complexion every day.",
        link: "https://www.skin1004.com/collections/centella"
    },
];

// === Halaman Utama ============
export default function Home() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [hoveredBrandIndex, setHoveredBrandIndex] = useState(0); 

    const slides = [
        {
            image: "/image/profile_awal.jpg",
            subtitle: "Endeavor together to make a better society",
            title: "Innovating Goods \nfor The Greater \nGood",
        },
        {
            image: "/image/profile02.jpg",
            subtitle: "Endeavor together to make a better society",
            title: "Innovating for the\n Greater Good\n Of People",
        },
        {
            image: "/image/profile03.jpg",
            subtitle: "Endeavor together to make a better society",
            title: "Innovating for the\n Greater Good\n Of Planet",
        },
    ];

    const nextSlide = () => setActiveImageIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setActiveImageIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    // Fungsi placeholder untuk menangani submit pencarian
    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Mencegah reload halaman
        console.log("Mencari:", searchTerm);
    };

    return (
        <div className="font-sans bg-white relative"> 
            {/* HEADER NAVIGASI BIRU (Sticky) */}
            <header className="bg-[#1C4E80] text-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">         
                    <div className="flex items-center ">
                        <a href="/" className="flex items-center space-x-2 mr-10"> 
                            <CustomImage
                                src="/image/moon2.png"
                                alt="Logo"
                                width={25}
                                height={25}
                                className="dark:invert"
                            />
                            <span className="font-bold text-lg">LUMÉRA</span>
                        </a>

                        {/* Menu Navigasi - Sekarang di sebelah logo */}
                        <nav className="hidden md:flex space-x-6 text-sm">
                            <a href="/about" className="hover:underline">About Us</a>
                            <a href="/brands" className="hover:underline">Brands</a>
                           
                        </nav>
                    </div>

                    {/* Ikon Pencarian dan Search Bar Overlay - Tetap di sisi kanan */}
                    <div className="relative flex items-center">
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

            {/* SEARCH BAR SIDE PANEL */}
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
                        {searchTerm === "Wardah" && (
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="block py-2 px-3 hover:bg-blue-700 rounded">Wardah Lightening Day Cream</a></li>
                                <li><a href="#" className="block py-2 px-3 hover:bg-blue-700 rounded">Wardah Nature Daily</a></li>
                            </ul>
                        )}
                        {searchTerm && searchTerm !== "Wardah" && (
                            <p className="mt-4 text-gray-400">Tidak ada hasil ditemukan untuk "{searchTerm}".</p>
                        )}
                        {!searchTerm && (
                            <p className="mt-4 text-gray-400">Ketik kata kunci untuk memulai pencarian.</p>
                        )}
                    </div>
                </form>
            </div>

            {/* HERO SECTION */}
            <section className="relative min-h-screen overflow-hidden bg-black">
                <div className="absolute inset-0 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeImageIndex}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <CustomImage
                                src={slides[activeImageIndex].image}
                                alt={`Slide ${activeImageIndex + 1}`}
                                layoutFill={true}
                                objectCover={true}
                                priority={activeImageIndex === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E80]/80 to-[#60A5FA]/70 mix-blend-multiply"></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="absolute inset-0 flex items-center px-8 md:px-16 z-10 text-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeImageIndex}
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 40, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="max-w-2xl"
                        >
                            <p className="text-lg mb-4">{slides[activeImageIndex].subtitle}</p>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight whitespace-pre-line">
                                {slides[activeImageIndex].title}
                            </h1>
                            <div className="mt-10 flex items-center space-x-6">
                                {[0, 1, 2].map((index) => (
                                    <button
                                        key={index}
                                        className={`text-2xl transition-all ${activeImageIndex === index
                                            ? "font-extrabold text-white scale-125"
                                            : "text-gray-300 hover:text-white"
                                            }`}
                                        onClick={() => setActiveImageIndex(index)}
                                    >
                                        0{index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={nextSlide}
                                    className="bg-blue-300 text-blue-900 rounded-full p-3 w-10 h-10 flex items-center justify-center hover:bg-blue-400 transition"
                                >
                                    ▶
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="absolute top-20 right-20 space-y-4 z-0">
                    <div className="bg-yellow-300 w-16 h-16 rotate-6 opacity-80"></div>
                    <div className="bg-pink-300 w-16 h-16 -rotate-12 opacity-80 ml-8"></div>
                    <div className="bg-green-300 w-16 h-16 rotate-3 opacity-80"></div>
                </div>
            </section>

            {/* ============== BAGIAN 2: ABOUT US ============== */}
            <section className="py-20 bg-[#1C4E80]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-white rounded-xl shadow-lg p-10 md:p-16 md:flex md:space-x-12">
                        <div className="md:w-2/3 text-[#1C4E80]">
                            <p className="uppercase text-sm tracking-widest text-[#1C4E80]/70 mb-3 font-semibold">
                                About Us
                            </p>
                            <h2 className="text-4xl font-bold mb-2 leading-snug">
                                Creating Goodness for <br />
                                Others is Our Belief
                            </h2>
                            <p className="italic text-[#60A5FA] font-semibold text-lg mb-6">
                                Since 2005
                            </p>
                            <p className="font-semibold mb-4">
                                Feel good, be good and do good are things that are connected within ourselves.
                            </p>
                            <p className="text-gray-700 mb-4">
                                I am very grateful that Luméra has accomplished this much. This is all thanks to the hard work and innovation of all Luméries and the support of the community, especially the Indonesian people, for our products and programs. I am very grateful and hope we can do greater and go further to achieve our dreams together.
                            </p>
                            <p className="font-semibold mb-4">
                                We dream of forming an innovative ecosystem where everyone can do good to one another and turn Indonesia into a better society for the next generations.
                            </p>
                            <p className="font-bold mt-6">
                                Pentolan Jawa <br />
                                <span className="font-normal">Founder of Luméra</span>
                            </p>
                        </div>
                        <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center items-center">
                            <div className="relative w-fit">
                                <div className="absolute -left-10 -bottom-10">
                                    <div className="relative">
                                        <div className="absolute -left-2 bottom-0 flex flex-col gap-2">
                                            {Array.from({ length: 8 }).map((_, i) => (
                                                <div key={`col-${i}`} className="w-3 h-3 bg-[#60A5FA] rounded-full opacity-80"></div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            {Array.from({ length: 8 }).map((_, i) => (
                                                <div key={`row-${i}`} className="w-3 h-3 bg-[#60A5FA] rounded-full opacity-80"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <CustomImage
                                        src="/image/founder.jpg"
                                        alt="Pentolan Jawa"
                                        className="rounded-lg shadow-md"
                                        width={320}
                                        height={400}
                                        objectCover={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============== BAGIAN 3: PARAGON AT A GLANCE ============== */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm uppercase text-[#1C4E80] font-bold mb-2 tracking-wide">
                        LUMÉRA IN ESSENCE
                    </p>
                    <h2 className="text-5xl font-extrabold text-[#1C4E80] mb-4">Luméries</h2>
                    <p className="text-gray-700 mb-12 max-w-xl text-lg leading-relaxed">
                        With more than 10.000 employees that we call <span className="font-bold text-[#1C4E80]">Luméries</span> all over Indonesia and Malaysia, we keep on innovating for better products, programs, and ways of working to create more goodness to the society.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
                        <div className="text-center flex flex-col items-center">
                            <div className="mx-auto w-20 h-20 rounded-full border-2 border-[#1C4E80] flex items-center justify-center mb-3">
                                <svg
                                    className="w-10 h-10 text-[#1C4E80]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-4xl font-extrabold text-[#1C4E80] mb-1">
                                <AnimatedCounter endValue={1000000} prefix=">" />
                            </h3>
                            <p className="text-gray-700 text-base font-medium">Luméries</p>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="mx-auto w-20 h-20 rounded-full border-2 border-[#1C4E80] flex items-center justify-center mb-3">
                                <svg
                                    className="w-10 h-10 text-[#1C4E80]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-4xl font-extrabold text-[#1C4E80] mb-1">
                                <AnimatedCounter endValue={73} />
                            </h3>
                            <p className="text-gray-700 text-base font-medium">Distribution Centers</p>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="mx-auto w-20 h-20 rounded-full border-2 border-[#1C4E80] flex items-center justify-center mb-3">
                                <svg
                                    className="w-10 h-10 text-[#1C4E80]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-4xl font-extrabold text-[#1C4E80] mb-1">
                                <AnimatedCounter endValue={230} prefix=">" />
                            </h3>
                            <p className="text-gray-700 text-base font-medium">CSR Partners</p>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="mx-auto w-20 h-20 rounded-full border-2 border-[#1C4E80] flex items-center justify-center mb-3">
                                <svg
                                    className="w-10 h-10 text-[#1C4E80]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 12v-1m-4-4h4m-4 0h-4m8 0h4m-4 0h-4m-4-4h4m-4 0h-4m8 0h4m-4 0h-4m-4-4h4m-4 0h-4m8 0h4m-4 0h-4"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-4xl font-extrabold text-[#1C4E80] mb-1">
                                <AnimatedCounter endValue={2340} prefix=">" />
                            </h3>
                            <p className="text-gray-700 text-base font-medium">SKU Products</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============== BAGIAN 4: BRANDS - REVISI BARU ============== */}
            <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-white">
                {/* Background Image Dinamis */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={brandData[hoveredBrandIndex].image}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }} // Transisi 
                        className="absolute inset-0"
                    >
                        <CustomImage
                            src={brandData[hoveredBrandIndex].image}
                            alt={brandData[hoveredBrandIndex].name}
                            layoutFill={true}
                            objectCover={true}
                            className="brightness-[0.35]"
                            priority={hoveredBrandIndex === 0}
                            initialScale={1} // Mulai dari skala normal
                            animateScale={1.05} // Zoom in sedikit
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Konten (Nama Brand Sampingan & Deskripsi/View More) */}
                <div className="absolute inset-0 flex flex-col justify-center text-white p-8 md:p-16 z-10">
                    <div className="flex w-full h-full">
                        {brandData.map((brand, index) => (
                            <div
                                key={brand.name}
                                className="relative flex-1 flex flex-col justify-start items-start pt-10 px-4 group"
                                onMouseEnter={() => setHoveredBrandIndex(index)}
                                onMouseLeave={() => setHoveredBrandIndex(0)}
                            >
                                <motion.h3
                                    className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 cursor-pointer relative z-20 
                                                ${hoveredBrandIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}
                                    initial={{ y: 0 }}
                                    animate={{ y: hoveredBrandIndex === index ? -5 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {brand.name}
                                    {/* Garis bawah aktif */}
                                    {hoveredBrandIndex === index && (
                                        <motion.div
                                            layoutId="activeBrandUnderline"
                                            className="absolute -bottom-2 left-0 h-1 bg-[#60A5FA]"
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </motion.h3>

                                {/* Deskripsi Brand */}
                                <motion.div
                                    className={`text-left mt-2 transition-opacity duration-300 ${hoveredBrandIndex === index ? 'opacity-100' : 'opacity-70'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <p className="text-xs md:text-sm leading-relaxed mb-4" style={{ fontFamily: 'sans-serif' }}>
                                        {brand.description}
                                    </p>
                                    {/* View More dengan link dinamis */}
                                    <AnimatePresence>
                                        {hoveredBrandIndex === index && (
                                            <motion.a
                                                href={brand.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="inline-flex items-center text-white text-sm hover:text-[#60A5FA] transition-colors"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                View More
                                                <span className="ml-2">→</span>
                                            </motion.a>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Garis Vertikal Pemisah */}
                                {index < brandData.length - 1 && (
                                    <div className="absolute right-0 top-10 bottom-10 w-px bg-white opacity-20"></div>
                                )}
                            </div>
                        ))}
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