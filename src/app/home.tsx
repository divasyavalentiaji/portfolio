"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Projects from "./projects";
import { useRef, useState, useEffect } from "react";
import Certificates from "./certificates";
import Contact from "./contact";

export default function Home() {
  // Daftar menu navbar
  const menuItems = ["Home", "Projects", "Certificates", "Contact"];
  
  // STATE NAVBAR & MENU
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  // REFS SECTION
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const certificatesRef = useRef(null);
  const contactRef = useRef(null);

  // INVIEW DETECTION
  const isHeroAnimated = useInView(heroRef, {
    margin: "-50% 0px -50% 0px",
    amount: "some",
  }); // Deteksi animasi Hero section
  const isHeroInView = useInView(heroRef, { margin: "-50% 0px -50% 0px" });
  const isProjectsInView = useInView(projectsRef, {
    margin: "-50% 0px -50% 0px",
  });
  const isCertificatesInView = useInView(certificatesRef, {
    margin: "-50% 0px -50% 0px",
  });
  const isContactInView = useInView(contactRef, {
    margin: "-50% 0px -50% 0px",
  });

  // EFFECT UPDATE NAVBAR ACTIVE SECTION
  useEffect(() => {
    if (isHeroInView) setActiveSection("Home");
    else if (isProjectsInView) setActiveSection("Projects");
    else if (isCertificatesInView) setActiveSection("Certificates");
    else if (isContactInView) setActiveSection("Contact");
  }, [isHeroInView, isProjectsInView, isCertificatesInView, isContactInView]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-white text-gray-900 font-sans">
      {/* NAVBAR */}
      <nav className="w-full sticky top-0 z-10 bg-white/70 backdrop-blur-md shadow-md px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center">
              <a href="#home" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={40} 
                  height={40}
                  className="cursor-pointer"
                />
              </a>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-3">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === item
                    ? "bg-[#0000CC] text-white"
                    : "text-[#0000CC] hover:bg-[#0000CC] hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            className="md:hidden text-[#0000CC]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {menuOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-2">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeSection === item
                    ? "bg-[#0000CC] text-white"
                    : "text-[#0000CC] hover:bg-[#0000CC] hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        ref={heroRef}
        className="snap-start min-h-screen flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 py-20 sm:px-12 md:px-24 relative overflow-hidden"
      >
        {/* HERO TEXT */}
        <motion.div
          className="md:w-1/2 text-center md:text-left z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={isHeroAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-800">
            {"Hi, I'm"}
          </h2>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-[#0000CC]">
            Divasya Valentiaji
          </h1>
          <p className="text-base sm:text-lg mb-6 leading-relaxed text-gray-700">
            {"I'm an Information Systems graduate with an interest in system analysis, UI/UX design, web development, and data science. Here's a look at some of my work."}
          </p>

          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-[#0000CC] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#000099] transition"
          >
            Explore My Work
          </a>
        </motion.div>

        {/* HERO IMAGE */}
        <motion.div
          className="md:w-1/2 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isHeroAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-[320px] h-[400px] sm:w-[360px] sm:h-[450px] md:w-[400px] md:h-[500px]">
            {/* FLOATING CIRCLE TOP LEFT */}
            <motion.div
              className="absolute -top-12 -left-14 w-48 h-48 bg-[#0000CC] rounded-full blur-3xl opacity-20 z-0"
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* FLOATING CIRCLE BOTTOM RIGHT */}
            <motion.div
              className="absolute bottom-0 right-0 w-36 h-36 bg-[#0000CC] rounded-full blur-2xl opacity-20 z-0"
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <Image
              src="/images/foto1.png"
              alt="Divasya"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <div ref={projectsRef}>
        <Projects />
      </div>

      {/* CERTIFICATES SECTION */}
      <div ref={certificatesRef}>
        <Certificates />
      </div>

      {/* CONTACT SECTION */}
      <div ref={contactRef}>
        <Contact />
      </div>
    </main>
  );
}
