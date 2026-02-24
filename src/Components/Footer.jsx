import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import logo from "../assets/velocelogo.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const topLinksRef = useRef(null);
  const logoRef = useRef(null);
  const bottomTextRef = useRef(null);
  const checkerboardRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Animate top links in
      tl.from(topLinksRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      })
        // 2. Giant logo pops up
        .from(
          logoRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        // 3. Bottom text fades in
        .from(
          bottomTextRef.current,
          { opacity: 0, y: 10, duration: 0.4 },
          "-=0.4",
        );

      // 4. Continuous scroll effect for the checkerboard (like the header)
      gsap.to(checkerboardRef.current, {
        backgroundPositionX: "-300px",
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#CD9D65] flex flex-col pt-16 md:pt-24 overflow-hidden relative"
    >
      {/* Top Links Section */}
      <div
        ref={topLinksRef}
        className="w-full flex flex-col md:flex-row px-6 md:px-10 lg:px-12 gap-12 md:gap-0"
      >
        {/* Left Links */}
        <div className="flex flex-col w-full md:w-[50%] gap-4 items-center md:items-start text-center md:text-left">
          <a
            href="#stockists"
            className="font-Jaro font-bold text-black uppercase text-xl md:text-2xl lg:text-3xl hover:opacity-60 transition-opacity"
          >
            Find Stockists
          </a>
          <a
            href="#about"
            className="font-Jaro font-bold text-black uppercase text-xl md:text-2xl lg:text-3xl hover:opacity-60 transition-opacity"
          >
            About
          </a>
        </div>

        {/* Right Contact Info */}
        <div className="flex flex-col w-full md:w-[50%] gap-4 items-center md:items-start text-center md:text-left">
          <a
            href="tel:6465554567"
            className="font-Jaro font-bold text-black uppercase text-xl md:text-2xl lg:text-3xl tracking-widest hover:opacity-60 transition-opacity"
          >
            (646) 555-4567
          </a>
          <a
            href="mailto:hello@figma.com"
            className="font-Jaro font-bold text-black uppercase text-xl md:text-2xl lg:text-3xl tracking-widest hover:opacity-60 transition-opacity"
          >
            Hello@figma.com
          </a>
        </div>
      </div>

      {/* Giant Middle Logo */}
      {/* Changed to justify-center on mobile, justify-start on md+ */}
      <div className="w-full px-6 md:px-10 lg:px-12 mt-16 md:mt-24 mb-12 md:mb-16 flex justify-center md:justify-start">
        <img
          ref={logoRef}
          src={logo}
          alt="Veloce Logo"
          className="h-auto max-h-[40vh] object-contain drop-shadow-lg"
        />
      </div>

      {/* Copyright Text */}
      {/* Changed to justify-center on mobile, justify-start on md+ */}
      <div className="w-full px-6 md:px-10 lg:px-12 pb-6 flex justify-center md:justify-start">
        <p
          ref={bottomTextRef}
          className="text-black font-bold uppercase text-xs md:text-sm tracking-wide font-sans text-center md:text-left"
        >
          Company Name© 2025 All Rights Reserved
        </p>
      </div>

      {/* Bottom Checkerboard Pattern */}
      <div
        ref={checkerboardRef}
        className="w-full h-6 md:h-8"
        style={{
          // Uses transparent for the second color so the tan background shows through
          background:
            "repeating-conic-gradient(#171717 0% 25%, transparent 0% 50%) 0% 50% / 1.5rem 1.5rem",
        }}
      ></div>
    </footer>
  );
}
