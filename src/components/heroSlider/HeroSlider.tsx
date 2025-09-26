import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


interface TypingTextProps {
  text: string;
  speed?: number; // milliseconds per character
  className?: string;
}
interface Slide {
  _id: string;
  title: string;
  desc: string;
  image: string;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 20,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText(""); // Reset on every render
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {displayedText}
    </motion.p>
  );
};

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  const getHeroes = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/get-hero`);
      if (response?.data.success) {
        setSlides(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching heroes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHeroes();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (loading) {
    return (
      <section className="w-full h-[70vh] flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Loading heroes...
        </p>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="w-full h-[70vh] flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          No hero slides found.
        </p>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 mt-1">
      {/* Slide Container */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 
       min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] 
       items-center px-6 md:px-20 transition-all duration-700"
      >
        {/* Left: Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentIndex]?._id + "-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center md:text-left space-y-6 z-10 order-2 md:order-1 pb-16 md:pb-0"
          >
            <TypingText
              key={slides[currentIndex]?._id + "-title"}
              text={slides[currentIndex]?.title || ""}
              speed={80}
              className="text-4xl font-bold sm:text-5xl"
            />

            <TypingText
              key={slides[currentIndex]?._id + "-typing"}
              text={slides[currentIndex]?.desc || ""}
              className="text-lg text-gray-700 dark:text-gray-300"
            />

            <Link
              to="/shop"
              className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Shop Now
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Right: Image */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <div className="relative w-[250px] sm:w-[300px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[currentIndex]?._id}
                src={slides[currentIndex]?.image || ""}
                alt={`Slide ${currentIndex + 1}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full object-contain"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              currentIndex === index
                ? "bg-gray-900 dark:bg-white"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
