"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import toast from "react-hot-toast";

export default function Contact() {
  // REF SECTION CONTACT
  const sectionRef = useRef(null);
  
  // DETEKSI INVIEW UNTUK ANIMASI
  const isInView = useInView(sectionRef, {
    margin: "-50% 0px -50% 0px",
  });

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mjkopyro", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Your message has been sent!");
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scroll-mt-8 snap-start min-h-screen px-6 sm:px-12 md:px-24 py-20 bg-white flex items-center"
    >
      <motion.div
        className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* LEFT SIDE - IMAGE + TEXT + SOCIAL LINKS */}
        <div className="lg:w-2/3 w-full flex flex-col lg:flex-row items-center lg:items-center gap-8">
          {/* IMAGE */}
          <img
            src="/images/Hello.png"
            alt="Collaboration Illustration"
            className="w-72 h-auto"
          />

          {/* TEXT + SOCIAL ICONS */}
          <div className="text-center lg:text-left">
            {/* TITLE */}
            <h2 className="text-3xl font-bold text-[#0000CC] mb-4">
              Let’s Connect!
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-700 text-lg mb-4">
              Feel free to reach out for any inquiries, collaboration
              opportunities, or just want to say hello 👋🏻
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center lg:justify-start gap-5 mt-2">
            <a
                href="mailto:divasyavalentiaji@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Email"
                className="w-9 h-9 bg-[#D93025] rounded-full shadow-md flex items-center justify-center hover:brightness-110 transition hover:scale-110"
            >
                <img
                src="/icons/icons8-gmail.svg"
                alt="Email"
                className="w-5 h-5"
                />
            </a>
            <a
                href="https://wa.me/6281517486167"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-9 h-9 bg-[#25D366] rounded-full shadow-md flex items-center justify-center hover:brightness-110 transition hover:scale-110"
            >
                <img
                src="/icons/icons8-whatsapp.svg"
                alt="WhatsApp"
                className="w-5 h-5"
                />
            </a>
            <a
                href="https://www.linkedin.com/in/divasya-valentiaji-1ba25624a"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-9 h-9 bg-[#0077B5] rounded-full shadow-md flex items-center justify-center hover:brightness-110 transition hover:scale-110"
            >
                <img
                src="/icons/icons8-linkedin.svg"
                alt="LinkedIn"
                className="w-5 h-5"
                />
            </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-xl w-full text-left lg:w-1/3"
        >
          {/* INPUT NAME */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#0000CC]"
            required
          />

          {/* INPUT EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#0000CC]"
            required
          />

          {/* TEXTAREA MESSAGE */}
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#0000CC]"
            required
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="bg-[#0000CC] text-white py-3 rounded font-semibold hover:bg-[#000099] transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}
