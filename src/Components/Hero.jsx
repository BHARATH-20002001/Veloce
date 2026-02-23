import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroBg from "../assets/hero-banner-bg.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  const h1TopRef = useRef(null); // Renamed to h1 for clarity
  const topButtonRef = useRef(null);
  const h2BottomRef = useRef(null);
  const bottomButtonRef = useRef(null);
  const bottomContentRef = useRef(null);

  const heroButtons = {
    shop: { label: "Shop Now", url: "/#shop" },
    about: { label: "About Us", url: "/#about" },
  };

  const bottomText =
    "Veloce is the zero-proof aperitif for modern living, crafted with super herbs and nutraceuticals to elevate your well-being, without compromising the sophisticated ritual of the aperitif.";

  useGSAP(
    () => {
      // 1. Immediate Entrance animation (Plays together AFTER the Header finishes)
      // Grouping both refs in an array makes them animate at the exact same time
      gsap.from([h1TopRef.current, topButtonRef.current], {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 2.2, // Wait for the Header's 2-second timeline to finish before showing
      });

      // 2. Parallax Scroll Effect for the Background Image
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // 3. Slow, Color-Shifting Scroll Trigger for Bottom Text
      gsap.fromTo(
        h2BottomRef.current.children,
        {
          y: 60,
          opacity: 0,
          color: "#ffffff",
        },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          stagger: 0.15,
          ease: "power2.out",
          keyframes: {
            color: ["#ffffff", "#CD9D65", "#000000"],
          },
          scrollTrigger: {
            trigger: bottomContentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 4. Scroll animation for the bottom button
      gsap.from(bottomButtonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bottomContentRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: heroRef },
  );

  return (
    <section ref={heroRef} className="w-full bg-white flex flex-col">
      {/* Main Top Container */}
      <div className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row items-start justify-start">
        {/* Parallax Background Layer */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-[120%] -top-[15%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HeroBg})` }}
        ></div>

        {/* Left Content Layer */}
        <div className="px-[20px] relative z-10 w-full md:w-[50%] lg:w-[42%] h-[55vh] md:h-[50vh] flex-none bg-[#CD9D65] p-0 md:p-12 lg:h-screen p-20 flex flex-col justify-items-start items-start">
          <div>
            <h1
              ref={h1TopRef}
              className="font-Staatliches font-bold uppercase text-black leading-[1.05] tracking-wide text-2xl md:text-2xl lg:text-3xl mb-6 md:mb-10 flex flex-wrap"
            >
              The only spirit-free aperitif that tastes as good as it makes you
              feel.
            </h1>

            <a
              ref={topButtonRef}
              href={heroButtons.shop.url}
              className="inline-block bg-black text-white font-Staatliches font-bold uppercase tracking-widest text-sm md:text-base lg:text-lg py-3 md:py-4 px-10 md:px-14 border-2 border-black hover:bg-neutral-600 hover:border-neutral-900 transition-colors duration-300 text-center"
              style={{ borderRadius: "50%" }}
            >
              {heroButtons.shop.label}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom White Section */}
      <div
        ref={bottomContentRef}
        className="w-full bg-white py-12 px-[20px] md:p-16 lg:p-24 flex flex-col items-start z-10 relative"
      >
        <div className="max-w-5xl">
          <h2
            ref={h2BottomRef}
            className="font-Staatliches font-bold uppercase text-black leading-[1.3] tracking-[-1px] text-3xl md:text-3xl lg:text-3xl mb-8 md:mb-12 flex flex-wrap"
          >
            {bottomText.split(" ").map((word, index) => (
              <span key={index} className="inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h2>

          <a
            ref={bottomButtonRef}
            href={heroButtons.about.url}
            className="inline-block bg-transparent text-black font-Staatliches font-bold uppercase tracking-widest text-sm md:text-base lg:text-lg py-3 md:py-4 px-10 md:px-14 border-2 border-black hover:bg-neutral-800 hover:text-white hover:border-neutral-800 transition-colors duration-300 text-center"
            style={{ borderRadius: "50%" }}
          >
            {heroButtons.about.label}
          </a>
        </div>
      </div>
    </section>
  );
}
