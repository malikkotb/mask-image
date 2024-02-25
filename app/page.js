"use client";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

function getRandomHexCode() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [gradientWidth, setGradientWidth] = useState("100px"); // Initial value of gradient width
  const coverRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const manageMouseMove = (e) => {
    if (!coverRef.current) return;
    const { clientX, clientY } = e;
    coverRef.current.style.setProperty("--x", `${clientX}px`);
    coverRef.current.style.setProperty("--y", `${clientY}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const randomColor = getRandomHexCode();
    coverRef.current.style.setProperty("--color", `${randomColor}`)
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setIsHovered(false);
    const randomColor = getRandomHexCode();
    coverRef.current.style.setProperty("--color", `${randomColor}`)
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={coverRef} className="cover bg-black items-center w-full h-screen flex justify-center">
        <h3 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-8xl uppercase text-white">
          Gradients
        </h3>
      </div>
    </>
  );
}
