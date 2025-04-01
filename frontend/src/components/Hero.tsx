import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center my-20">
      <h1 className="font-bold  text-gray-700 text-3xl">
        Welcome to{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">
          ShopiFy
        </span>{" "}
      </h1>
      <p className="my-4 font-semibold text-lg">
        Your One-Stop Shop for Everything You Need, Anytime, Anywhere.
      </p>
      <p className="text-gray-600 text-md">
        Shopify is your ultimate eCommerce platform, designed to help you build,
        manage, and grow your online business with ease. Whether you're selling
        products, services, or digital goods, Shopify provides all the tools you
        need to create a seamless shopping experience for your customers.
      </p>
    </div>
  );
};

export default Hero;
