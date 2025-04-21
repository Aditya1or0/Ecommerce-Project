// components/About/ServiceSection.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Tag,
  Heart,
  CreditCard,
  Undo2,
  ShieldCheck,
} from "lucide-react";

interface ServiceItemProps {
  item: {
    icon: React.ReactNode;
    title: string;
    desc: string;
  };
}

const ServiceCard: React.FC<ServiceItemProps> = ({ item }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 h-full flex flex-col"
    whileHover={{
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, margin: "-50px" }}
  >
    <div className="rounded-full bg-gray-50 p-3 w-12 h-12 flex items-center justify-center mb-4">
      {item.icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
    <p className="text-gray-600 flex-grow">{item.desc}</p>
  </motion.div>
);

const Service: React.FC = () => {
  const services = [
    {
      icon: <ShoppingCart className="text-cyan-500 w-6 h-6" />,
      title: "Product Shopping",
      desc: "Browse and shop from a vast selection of products ranging from electronics to fashion.",
    },
    {
      icon: <Tag className="text-fuchsia-500 w-6 h-6" />,
      title: "Exclusive Deals",
      desc: "Discover discounts and exclusive deals on top-rated brands and products.",
    },
    {
      icon: <Heart className="text-red-500 w-6 h-6" />,
      title: "Personalized Experience",
      desc: "Get personalized recommendations based on your preferences and history.",
    },
    {
      icon: <CreditCard className="text-emerald-500 w-6 h-6" />,
      title: "Fast & Secure Payments",
      desc: "Hassle-free checkout with secure payment options.",
    },
    {
      icon: <Undo2 className="text-blue-500 w-6 h-6" />,
      title: "Easy Returns & Support",
      desc: "Simple return process and dedicated customer service.",
    },
    {
      icon: <ShieldCheck className="text-indigo-500 w-6 h-6" />,
      title: "Buyer Protection",
      desc: "Shop confidently with our Buyer Protection policy.",
    },
  ];

  return (
    <motion.div
      className="bg-gray-50 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-4xl text-gray-800 font-semibold text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
            Services
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <ServiceCard item={item} key={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Service;
