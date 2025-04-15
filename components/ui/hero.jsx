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
    <section className="w-full h-full pt-36 md:pt-48 pb-10 relative ">
      {/* <div class="relative h-[100px] w-[100px] bg-white">
        </div> */}
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:28px_42px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
        {/* <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div> */}
      <div className="space-y-6 relative z-10 text-center ">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Master Languages with AI
            <br />
            <span className="mt-1 text-green-700">
              Interactive, Smart, and Fun!
            </span>
          </h1>
          <p className=" max-w-[600px] text-muted-foreground md:text-xl mx-10 sm:mx-auto">
            Chat, learn, and grow—our AI-powered tutor provides real-time
            corrections, pronunciation guidance, and engaging exercises to make
            language learning seamless.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 bg-black hover:bg-green-700">
              Get Started
            </Button>
          </Link>
          {/* <Link href="">
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-2 border-gray-400"
            >
              Watch Demo
            </Button>
          </Link> */}
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
