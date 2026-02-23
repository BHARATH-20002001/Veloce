import Header from "./Components/Header";
import Hero from "./Components/Hero";
import FeaturedProduct from "./Components/FeaturedProduct";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Hero />
      <FeaturedProduct />
    </div>
  );
}
