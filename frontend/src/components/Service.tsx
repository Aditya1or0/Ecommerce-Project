import { CreditCard, Heart, ShoppingCart, Tag, Undo2 } from "lucide-react";
import React from "react";
import ServiceCard from "./ServiceCard";

// Define the type for each service item
interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

// Define the services array with the correct type
const services: ServiceItem[] = [
  {
    icon: <ShoppingCart className="text-cyan-500" />,
    title: "Product Shopping",
    desc: "Browse and shop from a vast selection of products ranging from electronics to fashion, home goods, and more. We offer competitive prices, quality products, and fast delivery options.",
  },
  {
    icon: <Tag className="text-fuchsia-500" />,
    title: "Exclusive Deals",
    desc: "Discover incredible discounts and exclusive deals on top-rated brands and products. Our platform ensures you get the best value for your money, with regular sales and promotions.",
  },
  {
    icon: <Heart className="text-red-500" />,
    title: "Personalized Shopping Experience",
    desc: "Get personalized recommendations based on your preferences and shopping history. Whether you're looking for trending items or niche products, we make it easy to find exactly what you need.",
  },
  {
    icon: <CreditCard className="text-emerald-500" />,
    title: "Fast & Secure Payments",
    desc: "Enjoy hassle-free checkout with multiple payment options. Our secure payment gateway ensures that your transactions are safe and efficient.",
  },
  {
    icon: <Undo2 className="text-blue-500" />,
    title: "Easy Returns & Support",
    desc: "We provide a straightforward returns process and dedicated customer support to make sure you're completely satisfied with your purchase. If you have any issues, we're here to help!",
  },
];

const Service: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-gray-700 font-semibold text-center mb-8">
        Our{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          Services
        </span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, index) => (
          <ServiceCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Service;
