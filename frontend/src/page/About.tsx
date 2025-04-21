import React from "react";
import Heading from "../components/about/Heading";
import Service from "../components/about/Service";
import Experience from "../components/about/Experience";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Heading />
      <Service />
      <Experience />
    </div>
  );
};

export default AboutPage;
