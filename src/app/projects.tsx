"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  FaExternalLinkAlt,
  FaFigma,
  FaFilePdf,
  FaFilePowerpoint,
  FaProjectDiagram,
  FaGithub
} from "react-icons/fa";
import { SiGooglecolab } from "react-icons/si";

// Categories tabs
const categories = ["UI/UX Design", "Web Development", "Data Science"] as const;

type ProjectCategory = typeof categories[number]; // "UI/UX Design" | "Web Development" | "Data Science"

interface Link {
  label: keyof typeof iconMap; 
  url: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  year: number;
  tools: string[];
  links: Link[];  
  details: string;
}

// Map label ke icon
const iconMap = {
  Figma: <FaFigma size={18} />,
  Document: <FaFilePdf size={18} />,
  PowerPoint: <FaFilePowerpoint size={18} />,
  "Draw.io": <FaProjectDiagram size={18} />,
  GitHub: <FaGithub size={18} />,
  Link: <FaExternalLinkAlt size={18} />,
  "Google Colab": <SiGooglecolab size={18} />,
};

// Projects data per kategori
const projects: Record<ProjectCategory, Project[]> = {
  "UI/UX Design": [
    {
      title: "SiKantin",
      description: "A university canteen ordering app that lets customers browse menus, place orders, and reserve tables in real-time while helping vendors manage products and orders digitally.",
      image: "/images/SiKantin.jpg",
      year: 2025,
      tools: ["Figma"],
      links: [
        { label: "Figma", url: "https://www.figma.com/proto/5dC6DnFvoEMGWwuyUP4C1P/SiKantin?node-id=0-1&t=0KvO69mMlN6erbQK-1" },
        { label: "PowerPoint", url: "https://www.canva.com/design/DAGwHO8si-U/wRGHISmARfEYN3d9YkpetA/view?utm_content=DAGwHO8si-U&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb2a30fb974" },
      ],
      details:
        "SiKantin is a digital solution designed to streamline the university canteen experience for both customers and vendors. Through the app, customers can view real-time menus, place orders without waiting in line, and even reserve tables in advance. On the vendor side, the platform simplifies product management and order tracking, enabling more efficient and organized operations.",
    },
    {
      title: "TrashBank",
      description: "A waste management mobile app enabling users to deposit recyclables via pick-up or drop-off and convert them into points redeemable for money.",
      image: "/images/TrashBank.jpg",
      year: 2023,
      tools: ["Figma"],
      links: [
        { label: "Figma", url: "https://www.figma.com/proto/F1W4oxIMYzG0e66wK5x96A/TrashBank?node-id=0-1&t=bXDn6s4B8L2OPvPL-1" },
        { label: "Document", url: "https://drive.google.com/file/d/15I3--NuzqjarU96JJQ1pg37IELtmY6CK/view?usp=sharing" },
      ],
      details:
        "TrashBank is a mobile platform designed to encourage recycling by offering convenient waste deposit options. Users can schedule a pick-up or drop off their recyclables at designated locations. Collected waste is converted into reward points, which can be redeemed for money, promoting both environmental responsibility and user engagement.",
    },
    {
      title: "RestNToast",
      description: "A QR-based restaurant ordering system that lets customers browse menus, place orders, and choose payment methods directly from their device.",
      image: "/images/RestNToast.jpg",
      year: 2022,
      tools: ["Figma"],
      links: [
        { label: "Figma", url: "https://www.figma.com/proto/B1PRjgzFcDMvcT9w4hJwQF/RestNToast?node-id=1-282&t=Cw1VswHOwBN4tYtm-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A282" },
      ],
      details:
        "RestNToast is a restaurant service solution that streamlines the dining experience through QR code integration. Customers scan a table-specific QR code to access the digital menu, place orders, and select payment options. At checkout, they simply present the generated QR code at the cashier, reducing wait times and improving ordering efficiency.",
    },
  ],
  "Web Development": [
    {
      title: "Sistem Pengajuan Cuti Mahasiswa",
      description: "A web-based system that enables students to submit academic leave requests, route them through multi-stage approvals, and automatically generate official decision letters.",
      image: "/images/SistemCutiFIK.jpg",
      year: 2025,
      tools: ["Laravel", "PHP", "PostgreSQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
      links: [
        { label: "Draw.io", url: "https://drive.google.com/file/d/13KN82EilRDMiZqgUKtdThhvlEc8Hn56Q/view?usp=sharing" },
        { label: "Figma", url: "https://www.figma.com/proto/DM5gSMn0HShuN5pJYnibIV/Proyek-TA-cutimhsfikupnvj?node-id=0-1&t=a4azLz0k5ZhS92mm-1" },
        { label: "GitHub", url: "https://github.com/divasyavalentiaji/cutimhsfikupnvj.git" },
        { label: "PowerPoint", url: "https://www.canva.com/design/DAGr1yH9SCY/EhvfhoEpQKi9wPWhpJjMmw/view?utm_content=DAGr1yH9SCY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5618ebdd48" }
      ],
      details: "This platform digitizes the academic leave process by allowing students to submit requests online, which are automatically routed through a series of approvals. Once all stages are completed, an official decision letter is generated. Role-based dashboards provide clear tracking and reporting, ensuring transparency and efficiency for both applicants and approvers."
    },
    {
      title: "eLibra",
      description: "A digital library website that allows users to explore and save books to their personal collection, while enabling administrators to manage book, author, and publisher data.",
      image: "/images/eLibra.jpg",
      year: 2023,
      tools: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
      links: [
        { label: "Draw.io", url: "https://drive.google.com/file/d/1jheiIrRMmY8EoZHPfi5Sp0UJhfpyW1Bg/view?usp=sharing" },
        { label: "Figma", url: "https://www.figma.com/design/qbuBJk9MVw2VSqJ03wVpVx/eLibra?node-id=0-1&p=f&t=6FleNyE4gF7QV4xf-0" },
        { label: "GitHub", url: "https://github.com/divasyavalentiaji/eLibra.git" },
        { label: "Document", url: "https://drive.google.com/file/d/1AKjqYliPKhYvYgWs4GQsyp6G8KnTcTIF/view?usp=sharing" }
      ],
      details: "eLibra is an online platform designed to enhance the digital reading experience. Users can browse a wide range of books and save their favorites to 'My Library' for easy access later. On the administrative side, the system provides tools for managing book collections, authors, and publishers, ensuring that the content remains organized and up to date."
    },
    {
      title: "PRETTYU",
      description: "A beauty e-commerce landing page website that showcases products and brand identity through a clean, modern, and user-friendly design.",
      image: "/images/prettyu.jpg",
      year: 2022,
      tools: ["HTML", "CSS", "Bootstrap"],
      links: [
        { label: "GitHub", url: "https://github.com/divasyavalentiaji/prettyu.git" }
      ],
      details: "Pretty U is a web-based landing page created for beauty and skincare e-commerce. The platform highlights featured products and promotions with an emphasis on aesthetic presentation and intuitive navigation. Its design focuses on enhancing brand visibility, engaging potential customers, and delivering a seamless online browsing experience."
    },
  ],
  "Data Science": [
    {
      title: "Diabetes Classification with K-NN",
      description: "A machine learning project that classifies diabetes cases from health indicators using the K-Nearest Neighbors algorithm.",
      image: "/images/Phyton.jpg",
      year: 2024,
      tools: ["Python", "Google Colab"],
      links: [
        { label: "Google Colab", url: "https://colab.research.google.com/drive/190A73K6QnWKCv0ADo6y55YqgAZFr8N5o?usp=sharing" },
        { label: "PowerPoint", url: "https://www.canva.com/design/DAGGaqxttvs/Wzd0QEeYL6S2wz66Q1tSOg/view?utm_content=DAGGaqxttvs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0e0ea39d96" }
      ],
      details: "This project applies the K-Nearest Neighbors algorithm to classify diabetes cases. The dataset was cleaned, balanced, and split for training and testing, with visualizations and evaluation metrics used to determine the optimal K value. The final model achieved reliable performance and revealed key patterns between health indicators and diabetes outcomes."
    },
    {
      title: "Fixed Deposit Prediction with Random Forest & CatBoost",
      description: "A machine learning project that predicts whether customers will open a fixed deposit using Random Forest and CatBoost models.",
      image: "/images/Phyton.jpg",
      year: 2024,
      tools: ["Python", "Google Colab"],
      links: [
        { label: "Google Colab", url: "https://colab.research.google.com/drive/13CaJcufMo7r1qA_IrNFCKh8IKYoayq_E?usp=sharing" },
        { label: "Document", url: "https://drive.google.com/file/d/1OSWmxJGRAvRo6Lp7R1QkVQKJE-1SJenJ/view?usp=sharing" }
      ],
      details: "This project analyzes the Bank Marketing Dataset to understand customer behavior and deposit decisions. After data preparation, analysis, and modeling with Random Forest and CatBoost, the results compared model performance and identified key drivers of deposits, helping banks refine marketing and personalize services."
    },
    {
      title: "Sales Trend Prediction with Linear Regression",
      description: "A machine learning project that predicts future sales trends from online retail transactions using the Linear Regression algorithm.",
      image: "/images/Phyton.jpg",
      year: 2024,
      tools: ["Python", "Google Colab"],
      links: [
        { label: "Google Colab", url: "https://drive.google.com/drive/folders/1RCpR5y9w4rwLv29SeMY0cf_ndrrwYp7o?usp=sharing" },
        { label: "PowerPoint", url: "https://www.canva.com/design/DAGH7AzYzJA/xlqbapu8zCzU_D67Y07onQ/view?utm_content=DAGH7AzYzJA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4e00f3ec6c" }
      ],
      details: "This project explores an Online Retail Dataset to study customer transactions, revenue patterns, and country-level sales performance. The workflow includes data cleaning, exploratory analysis, correlation study, and predictive modeling with linear regression. The results provide insights into historical sales behavior and generate future trend forecasts, supporting businesses in making strategic and data-driven decisions."
    },
  ],
};

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("UI/UX Design");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef(null);
  
  // DETEKSI INVIEW UNTUK ANIMASI
  const isInView = useInView(sectionRef, {
    margin: "-50% 0px -50% 0px",
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="
        scroll-mt-12
        sm:scroll-mt-12
        md:scroll-mt-12
        lg:scroll-mt-8
        snap-start
        min-h-screen
        px-6 sm:px-12 md:px-24 
        py-16 
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
        Projects
      </motion.h2>

      {/* TABS NAVIGATION */}
      <motion.div
        className="relative flex justify-center gap-6 mb-10 border-b border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category as ProjectCategory)}
            className={`pb-2 text-sm sm:text-base font-medium transition-colors duration-300 ${
              activeTab === category
                ? "text-[#0000CC]"
                : "text-gray-500 hover:text-[#0000CC]"
            }`}
            style={{ width: `${100 / categories.length}%` }}
          >
            {category}
          </button>
        ))}

        {/* Indicator Tab */}
        <motion.div
          layout
          className="absolute bottom-0 h-0.5 bg-[#0000CC]"
          style={{
            width: `${100 / categories.length}%`,
            left: `${
              categories.indexOf(activeTab) * (100 / categories.length)
            }%`,
          }}
        />
      </motion.div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects[activeTab].map((proj, idx) => (
          <motion.div
            key={idx}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition bg-white text-left hover:shadow-lg hover:shadow-[#0000CC]/40"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            onClick={() => setSelectedProject(proj)}
          >
            {/* Project Image */}
            <div className="relative w-full h-50">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Project Info */}
            <div className="p-3">
              {/* Title + Year */}
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {proj.title}
                </h3>
                <span className="text-sm text-gray-400">{proj.year}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600">{proj.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-lg w-full shadow-lg overflow-hidden relative"
          >
            {/* Modal Image */}
            <div className="relative w-full h-60">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Modal Info */}
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold mb-1 text-gray-800">
                {selectedProject.title}
              </h3>
              <span className="text-sm text-gray-400 block mb-3">
                {selectedProject.year}
              </span>
              <p className="text-sm text-gray-600 mb-4">
                {selectedProject.details}
              </p>

              {/* Tools Used */}
              <div className="flex justify-center flex-wrap gap-2 mb-4">
                {selectedProject.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="bg-[#0000CC]/10 text-[#0000CC] text-xs px-2 py-1 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Links as Icons */}
              <div className="flex justify-center gap-3">
                {selectedProject.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-[#0000CC] bg-white text-[#0000CC] shadow-md hover:bg-[#0000CC] hover:text-white transition-transform transform hover:scale-110"
                  >
                    {iconMap[link.label] || <FaExternalLinkAlt size={18} />}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Close Modal Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 text-white text-2xl hover:scale-110 transition"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
