import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Lavande from "../assets/Lavande.png";
import Primavera from "../assets/Primavera.png";
import Spezia from "../assets/Spezia.png";

gsap.registerPlugin(ScrollTrigger);

// Using high-quality unsplash placeholders until you drop in your final images
const products = [
  {
    id: 1,
    title: "LAVANDE",
    description:
      "A delicate and floral aperitif with notes of lavender and chamomile.",
    image: Lavande ,
  },
  {
    id: 2,
    title: "PRIMAVERA",
    description: "A refreshing and vibrant aperitif with bright citrus notes.",
    image: Primavera ,
  },
  {
    id: 3,
    title: "SPEZIA",
    description:
      "A bold, spiced aperitif featuring cardamom, ginger, and cinnamon.",
    image: Spezia ,
  },
];

export default function ProductGrid() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      // Staggered scroll entrance for the product cards
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Time between each card animating in
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-6 md:px-12 lg:px-10 py-16 md:py-24 lg:py-10 "
    >
      {/* CSS Grid: 1 column mobile, 2 columns on md/lg screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 lg:gap-x-10 md:gap-y-20">
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="flex flex-col group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[5/5] overflow-hidden bg-neutral-100">
              {/* Product Title Overlay */}
              <h3 className="absolute top-6 left-6 md:top-8 md:left-8 text-white font-Staatliches font-bold text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest z-10 drop-shadow-lg">
                {product.title}
              </h3>

              {/* Image with hover zoom effect */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-900 ease-out group-hover:scale-120"
              />
            </div>

            {/* Content Below Image */}
            <div className="flex flex-col mt-6 md:mt-8 gap-4 md:gap-6">
              <p className="font-Staatliches font-bold tracking-[-0.2px] text-black uppercase text-sm md:text-base lg:text-lg leading-[1.2] max-w-[100%]">
                {product.description}
              </p>

              <a
                href="#find"
                className="font-Staatliches font-bold tracking-[-1px] text-black uppercase text-[13px] md:text-[16px] hover:opacity-40 transition-opacity w-max"
              >
                Find Near You
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
