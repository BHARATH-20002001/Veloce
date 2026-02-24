import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import bgVideo from "../assets/Glassrotating.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProduct() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);

  // 1. Control Video Playback Speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Fixed the syntax error here and added 'delay: 2'
      tl.fromTo(
        headingRef.current.children,
        { y: 40, opacity: 0, rotationZ: -50 },
        {
          y: 0,
          opacity: 1,
          rotationZ: 0,
          duration: 0.8, // I slightly increased this from 0.1 so you can actually see the cool 1080-degree spin!
          stagger: 0.1,
          ease: "power3.out",
          delay: 1, // <-- Here is your 2-second wait time!
        },
      )
        .fromTo(
          badgeRef.current,
          { scale: 0, opacity: 0, rotation: -30 },
          {
            scale: 1,
            opacity: 1,
            rotation: -1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        .fromTo(
          subtextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-end bg-black pb-10 md:pb-13 lg:h-[120vh]"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Foreground Content: Primavera Text */}
      <div className="relative z-20 flex flex-col items-center px-6">
        <div className="relative flex flex-col items-center">
          {/* Floating "NEW" Badge */}
          <div
            ref={badgeRef}
            className="absolute -top-[70vh] left-[30vw] md:-top-8 md:left-4 border-[1.5px] border-white px-3 py-1 md:px-5 md:py-1.5 flex items-center justify-center"
            style={{ borderRadius: "50%", transform: "rotate(-12deg)" }}
          >
            <span className="text-3xl text-white font-Staatliches font-black md:text-[17px] lg:text-4xl tracking-widest leading-none my-1">
              NEW
            </span>
          </div>

          {/* Main Heading - Split into spans for letter-by-letter animation */}
          <h2
            ref={headingRef}
            className="text-white tracking-[-4px] font-bold font-Staatliches text-[4rem] md:text-[6rem] tracking-[-5px] lg:text-[8rem] leading-none uppercase text-center drop-shadow-2xl"
          >
            {"Primavera".split("").map((letter, index) => (
              <span key={index} className="inline-block">
                {letter}
              </span>
            ))}
          </h2>

          {/* Subtext description */}
          <p
            ref={subtextRef}
            className="text-white font-Staatliches font-bold text-xs md:text-lg tracking-widest mt-2 md:mt-4 max-w-sm md:max-w-xl uppercase text-center drop-shadow-md"
          >
            A bold, spiced aperitif featuring cardamom, ginger, and cinnamon.
          </p>
        </div>
      </div>
    </section>
  );
}
