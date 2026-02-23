import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import logo from "../assets/velocelogo.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const dividerRef = useRef(null);
  const checkerboardRef = useRef(null);
  const navLinksRef = useRef([]);

  const navItems = [
    { label: "About", url: "/#about" },
    { label: "Find Us", url: "/#find-Us" },
    { label: "Contact", url: "/#contact" },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        logoRef.current,
        { y: -300, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, ease: "power3.out" },
      )
        .fromTo(
          taglineRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            transformOrigin: "right",
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .fromTo(
          navLinksRef.current,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power3.out" },
          "-=0.2",
        )
        .fromTo(
          checkerboardRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2",
        );

      gsap.to(checkerboardRef.current, {
        backgroundPositionX: "300px",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: headerRef },
  );

  return (
    <header ref={headerRef} className="w-full flex flex-col bg-white">
      {/* Changed default alignment to `items-start` so the logo sits at the top left on mobile.
        It transitions to `items-center` on tablet and `items-end` on desktop. 
      */}
      <div className="flex flex-row md:flex-col-reverse lg:flex-row items-start md:items-center lg:items-end justify-between w-full p-6 md:p-8 lg:px-12">
        <div className="w-[40%] md:w-full lg:w-[50%] pr-4 md:pr-0 lg:pr-4 md:mt-8 lg:mt-0 flex justify-start md:justify-center lg:justify-start">
          <img
            ref={logoRef}
            src={logo}
            alt="Veloce"
            className="w-full md:w-[400px] lg:w-full h-auto object-contain"
          />
        </div>

        <div className="flex flex-col w-[50%] md:w-full lg:w-[50%] pl-4 md:pl-0 lg:pl-4 gap-3 md:gap-4 mb-1 md:mb-0 lg:mb-1">
          {/* Added `hidden md:block` to hide on mobile */}
          <p
            ref={taglineRef}
            className="hidden md:block font-Staatliches font-bold uppercase tracking-wide text-black md:text-sm lg:text-[25px] self-top mb-[15vh] md:text-center lg:text-left"
          >
            The zero-proof aperitif for modern living.
          </p>

          {/* Added `hidden md:block` to hide on mobile */}
          <div
            ref={dividerRef}
            className="hidden md:block w-full h-[2px] bg-neutral-900"
          ></div>

          <nav className="flex flex-col md:flex-row justify-between w-full items-end md:items-center gap-2 md:gap-0">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.url}
                ref={(el) => (navLinksRef.current[index] = el)}
                className="font-Staatliches font-bold uppercase text-neutral-800 text-[10px] md:text-xs lg:text-[20px] font-bold hover:opacity-50 transition-opacity tracking-widest text-right md:text-left"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div
        ref={checkerboardRef}
        className="w-full h-4 md:h-5 lg:h-6"
        style={{
          background:
            "repeating-conic-gradient(#262626 0% 25%, #ffffff 0% 50%) 0% 50% / 1rem 1rem",
        }}
      ></div>
    </header>
  );
}