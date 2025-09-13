import React from "react";
import HeroSection from "../../componets/public/home/HeroSection";
import FeaturedDesserts from "../../componets/public/home/FeaturedDesserts";

const Home = () => {
  return (
    <div>
      <section>
        <HeroSection />
      </section>
      <section>
        <FeaturedDesserts />
      </section>
    </div>
  );
};

export default Home;
