'use client';

import { motion } from "framer-motion";

export default function Home() {
    // Liste des emojis
    const emojis = Array(20).fill("💩");

    // Générer une position aléatoire à chaque fois qu'un emoji apparaît
    const getRandomPosition = () => {
        return {
            x: Math.random() * 100 - 50, // position horizontale aléatoire entre -50 et 50
            y: Math.random() * 100 - 50, // position verticale aléatoire entre -50 et 50
        };
    };

    return (
        <div className="flex justify-center items-center h-screen bg-white overflow-hidden relative">

            {emojis.map((emoji, index) => {
                const randomPosition = getRandomPosition();

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1.5,
                            x: randomPosition.x + "vw",  // position horizontale aléatoire
                            y: randomPosition.y + "vh",  // position verticale aléatoire
                        }}
                        transition={{
                            duration: 2,
                            delay: Math.random(),  // Délai aléatoire pour l'apparition
                            ease: "easeInOut",
                        }}
                        className="absolute text-5xl z-10"
                    >
                        {emoji}
                    </motion.div>
                );
            })}

            <motion.p
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="text-4xl font-bold text-[#654321] "
            >
                Lele le pet
            </motion.p>
        </div>
    );
}
