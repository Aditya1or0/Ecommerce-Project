import React from "react";
import Hero from "../components/Hero";
import Products from "../components/ProductList";
import NewsLetterBox from "../components/NewsLetterBox";
import Experience from "../components/Experience";
import BestProduct from "../components/BestProduct";

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Products />
      <BestProduct />
      <Experience />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
