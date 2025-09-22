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
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
            onClick={() => setSelectedImages(null)}
        >
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-white rounded-lg p-4">
            {/* CLOSE BUTTON */}
            <button
                onClick={() => setSelectedImages(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
                ✕
            </button>

            {/* RENDER ALL SELECTED CERTIFICATE IMAGES */}
            <div className="flex flex-col gap-6">
                {selectedImages.map((img, i) => (
                <div key={i} className="relative w-full h-[80vh] max-h-[600px]">
                    <Image
                    src={img}
                    alt={`Certificate Page ${i + 1}`}
                    fill
                    className="object-contain"
                    />
                </div>
                ))}
            </div>
            </div>
        </div>
        )}
    </section>
  );
}
