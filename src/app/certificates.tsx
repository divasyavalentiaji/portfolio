"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// DATA CERTIFICATES
const certificates = [
  {
    title: "Data Analytics",
    issuer: "Certiport",
    year: 2024,
    images: ["/images/Sertifikat Certiport.jpg"],
  },
  {
    title: "Introduction to Data Analytics",
    issuer: "RevoU",
    year: 2024,
    images: ["/images/Sertifikat RevoU.jpg"],
  },
  {
    title: "Kickstart Fullstack Web Development Journey",
    issuer: "Rakamin Academy",
    year: 2024,
    images: ["/images/Sertifikat Rakamin Academy.jpg"],
  },
  {
    title: "Rapid UI/UX Development Bootcamp",
    issuer: "Maxy Academy",
    year: 2024,
    images: [
      "/images/Sertifikat Maxy Academy (1).jpg",
      "/images/Sertifikat Maxy Academy (2).jpg",
      "/images/Sertifikat Maxy Academy (3).jpg",
      "/images/Sertifikat Maxy Academy (4).jpg",
      "/images/Sertifikat Maxy Academy (5).jpg",
    ],
  },
  {
    title: "FREECLASS: DATA SCIENCE FUNDAMENTALS",
    issuer: "DQLab",
    year: 2024,
    images: [
      "/images/Sertifikat DQLab (1).jpg",
      "/images/Sertifikat DQLab (2).jpg",
      "/images/Sertifikat DQLab (3).jpg",
      "/images/Sertifikat DQLab (4).jpg",
    ],
  },
  {
    title: "Java Foundations",
    issuer: "Oracle",
    year: 2023,
    images: ["/images/Sertifikat Oracle.jpg"],
  },
  {
    title: "UML: Analisa Perancangan Sistem Berbasis Objek Part 1",
    issuer: "Central AI",
    year: 2023,
    images: ["/images/Sertifikat Central AI.png"],
  },
];

export default function Certificates() {
  // REF SECTION CERTIFICATES
  const sectionRef = useRef(null);
  
  // DETEKSI INVIEW UNTUK ANIMASI
  const isInView = useInView(sectionRef, {
    margin: "-50% 0px -50% 0px",
  });

  // STATE UNTUK MENAMPILKAN POPUP FULLSCREEN
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

  return (
    <section
        id="certificates"
        ref={sectionRef}
        className="
            scroll-mt-16
            sm:scroll-mt-20
            md:scroll-mt-12
            lg:scroll-mt-8
            snap-start
            min-h-screen
            px-6 sm:px-12 md:px-24
            py-10 sm:py-12 md:py-16
            text-center flex flex-col justify-center
        "
    >
      {/* SECTION TITLE */}
      <motion.h2
        className="text-3xl font-bold mb-10 text-[#0000CC]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Certificates
      </motion.h2>

      {/* GRID CERTIFICATES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {certificates.map((cert, idx) => (
          <motion.div
            key={idx}
            className="relative cursor-pointer group overflow-hidden shadow-sm border border-gray-200 transition hover:shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            onClick={() => setSelectedImages(cert.images)}
          >
            {/* CERTIFICATE IMAGE */}
            <div className="relative w-full h-[170px]">
              <Image
                src={cert.images[0]}
                alt={cert.title}
                fill
                className="object-cover"
              />
            </div>

            {/* OVERLAY TEXT ON HOVER */}
            <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center px-4 transition">
              <h3 className="text-sm font-semibold">{cert.title}</h3>
              <p className="text-xs">{cert.issuer}</p>
              <p className="text-xs mt-1 text-gray-300">{cert.year}</p>
              <p className="mt-2 text-xs italic">Click to enlarge</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* POPUP FULLSCREEN CERTIFICATES */}
      {selectedImages && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedImages(null)}
            className="absolute top-4 right-4 text-white text-3xl z-50 hover:scale-110 transition"
          >
            ✕
          </button>

          {/* CAROUSEL */}
          <CertificateCarousel images={selectedImages} />
        </div>
      )}
    </section>
  );
}

// COMPONENT CAROUSEL HARUS DI LUAR JSX
function CertificateCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center">
      {/* IMAGE */}
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex]}
          alt={`Certificate Page ${currentIndex + 1}`}
          fill
          className="object-contain"
        />
      </div>

      {/* LEFT ARROW */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl z-50 hover:scale-110 transition"
        >
          ‹
        </button>
      )}

      {/* RIGHT ARROW */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl z-50 hover:scale-110 transition"
        >
          ›
        </button>
      )}

      {/* PAGE INDICATOR */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
