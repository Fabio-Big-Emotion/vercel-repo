'use client';


import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="flex justify-center items-center h-screen bg-white overflow-hidden">
            {/* Cœur en fond */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute text-red-500 text-[300px] z-0"
            >
                ❤️
            </motion.div>

            {/* Texte par-dessus */}
            <motion.p
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="text-4xl font-bold text-white ">Je t'aime</motion.p>
        </div>
    );
}
