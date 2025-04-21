import React from "react";
import Hero from "../components/homepage/Hero";

import NewsLetterBox from "../components/NewsLetterBox";
import Experience from "../components/about/Experience";
import BestProduct from "../components/homepage/BestProduct";
import ProductsOnHome from "../components/ProductsOnHome";

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <ProductsOnHome />
      <BestProduct />
      <Experience />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
