"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";

const HeroSection = () => {
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const imageElement = imageRef.current;

//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const scrollThreshold = 100;

//       if (scrollPosition > scrollThreshold) {
//         imageElement.classList.add("scrolled");
//       } else {
//         imageElement.classList.remove("scrolled");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

  return (
    
    <section className="w-full pt-36 md:pt-48 pb-10 bg-gradient-to-b from-zinc-50 via-slate-50 to-slate-300">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
          Master Languages with AI
            <br />
            Interactive, Smart, and Fun!
          </h1>
          <p className=" max-w-[600px] text-muted-foreground md:text-xl mx-10 sm:mx-auto">
          Chat, learn, and grow—our AI-powered tutor provides real-time corrections, pronunciation guidance, and engaging exercises to make language learning seamless.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 bg-gradient-to-t from-lime-500 to-lime-800 hover:bg-white">
              Get Started
            </Button>
          </Link>
          <Link href="https://www.youtube.com/roadsidecoder">
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
        {/**<div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border sm:mx-auto"
              priority
            />
          </div>
        </div>*/}
      </div>
    </section>
    
  );
};

export default HeroSection;
