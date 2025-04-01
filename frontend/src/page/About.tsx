import React from "react";
import NewsLetterBox from "../components/NewsLetterBox";

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center my-20 px-4">
      <h1 className="font-bold text-gray-700 text-4xl sm:text-4xl mb-6">
        About <span className="text-cyan-600">Us</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-4xl">
        Welcome to <span className="text-cyan-600 font-semibold">Shopify</span>,
        your ultimate eCommerce companion. Our platform is thoughtfully designed
        to empower businesses of all sizes. Whether you're selling physical
        products, offering services, or sharing digital goods,{" "}
        <span className="text-cyan-600 font-semibold">Shopify</span>
        equips you with an intuitive interface, secure payment solutions, and a
        suite of customizable features to transform your online storefront into
        a thriving business.
      </p>
      <p className="text-lg text-gray-600 max-w-4xl mt-4">
        At <span className="text-cyan-600 font-semibold">Shopify</span>, we’re
        more than just an eCommerce platform—we’re your partners in growth. From
        first-time entrepreneurs to seasoned business owners, we are here to
        help you expand your reach, increase your sales, and create a seamless
        shopping experience your customers will love. The power of eCommerce is
        in your hands—let’s build something remarkable together.
      </p>
      <p className="text-lg  text-gray-600 max-w-4xl mt-8">
        Our commitment goes beyond just providing tools; we believe in fostering
        creativity and innovation. With 24/7 customer support, a global network
        of partners, and regular updates to stay ahead of industry trends,{" "}
        <span className="text-cyan-600 font-semibold">Shopify</span>
        is dedicated to making your eCommerce journey as smooth and successful
        as possible. Together, we can unlock endless possibilities in the world
        of online business.
      </p>
      <NewsLetterBox />
    </div>
  );
};

export default About;
