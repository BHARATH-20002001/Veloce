import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactImage from "../assets/contactimage.png";

const findUsImg = ContactImage;

gsap.registerPlugin(ScrollTrigger);

export default function FindUs() {
  const sectionRef = useRef(null);
  const bigTextRef = useRef(null);

  // Refs for the bottom section
  const bottomSectionRef = useRef(null);
  const bgRef = useRef(null);
  const bottomContentRef = useRef(null);

  useGSAP(
    () => {
      // 1. Entrance animation for the giant text (staggered slide up)
      gsap.from(bigTextRef.current.children, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bigTextRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 2. Parallax Scroll Effect for the Right Image
      gsap.to(bgRef.current, {
        yPercent: 25, // Shifts the image down smoothly as you scroll
        ease: "none",
        scrollTrigger: {
          trigger: bottomSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 3. Entrance animation for the bottom text block
      gsap.from(bottomContentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bottomContentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full flex flex-col">
      {/* Top Section: Giant Typography Block */}
      <div className="w-full bg-[#CD9D65] pt-16 pb-12 px-5 md:px-12 md:pt-24 md:pb-16 lg:px-5 lg:pt-32 lg:pb-24 flex flex-col justify-center overflow-hidden">
        <div ref={bigTextRef} className="flex flex-col">
          <h2 className="font-Staatliches font-bold uppercase text-[#613B0F] leading-[0.85] tracking-[-0.02em] text-[5rem] md:text-[8rem] lg:text-[11rem] m-0">
            LAVANDE
          </h2>
          <h2 className="font-Staatliches font-bold uppercase text-[#613B0F] leading-[0.85] tracking-[-0.02em] text-[5rem] md:text-[8rem] lg:text-[11rem] m-0">
            SPEZIA
          </h2>
          <h2 className="font-Staatliches font-bold uppercase text-[#613B0F] leading-[0.85] tracking-[-0.02em] text-[5rem] md:text-[8rem] lg:text-[11rem] m-0">
            PRIMAVERA
          </h2>
          <h2 className="font-Staatliches font-bold uppercase text-black leading-[0.85] tracking-[-0.02em] text-[5rem] md:text-[8rem] lg:text-[11rem] m-0">
            FIND US
          </h2>
        </div>
      </div>

      {/* Bottom Section: 50/50 Split with Parallax Image */}
      <div
        ref={bottomSectionRef}
        className="w-full h-screen overflow-hidden flex flex-col md:flex-row items-start justify-start bg-white"
      >
        {/* Left Content Layer (White Box - 50% width) */}
        <div className="relative z-10 w-full md:w-[50%] h-[28vh] md:h-screen flex-none bg-white p-5 md:p-16 lg:p-10 flex flex-col items-start">
          <p
            ref={bottomContentRef}
            className="font-Staatliches font-bold uppercase text-black leading-[1.05] tracking-wide text-2xl md:text-3xl lg:text-3xl max-w-[100%]"
          >
            Experience the refined taste of Véloce. Visit our premium stockists
            for your next alcohol-free aperitif.
          </p>
        </div>

        {/* Right Image Layer (50% width) */}
        <div className="relative w-full h-[80vh] md:w-[50%] md:h-screen flex-none overflow-hidden bg-neutral-100">
          {/* The image is made 130% height and shifted up (-top-[15%]) 
            so there is extra visual data for GSAP to scroll through. 
          */}
          <img
            ref={bgRef}
            src={findUsImg}
            alt="Contact"
            className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
