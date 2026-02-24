import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Import your existing components
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import FeaturedProduct from "./Components/FeaturedProduct";
import ProductGrid from "./Components/ProductGrid";
import FindUs from "./Components/FindUs";
import Footer from "./Components/Footer";

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2, // Higher = slower, smoother scroll. Lower = faster.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // A nice default easing curve
      smooth: true,
    });

    // 2. Sync Lenis scroll with GSAP's ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Add Lenis's requestAnimationFrame to GSAP's internal ticker
    // This ensures animations and scrolling are perfectly synced
    gsap.ticker.add((time) => {
      lenis.raf(time * 250);
    });

    // 4. Turn off GSAP's lag smoothing to prevent jitter when scrolling
    gsap.ticker.lagSmoothing(0);

    // Cleanup function when the component unmounts
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 800));
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedProduct />
      <ProductGrid />
      <FindUs />
      <Footer />
    </div>
  );
}
