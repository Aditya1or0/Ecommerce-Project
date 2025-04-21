import React from "react";
import { assets } from "../../assets/assets";

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between gap-4 py-3 px-3 mt-auto  border-t border-gray-400">
      <img src={assets.logo} width={120} alt="logo" className="mb-2" />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        &copy; 2024 ShopiFy. All Rights Reserved. | Powered by Innovation.
      </p>
      <div className="flex gap-2.5">
        <img src={assets.facebook} alt="fbimg" width={35} />
        <img src={assets.instagram} alt="fbimg" width={35} />
        <img src={assets.twitter} alt="fbimg" width={35} />
      </div>
    </footer>
  );
};

export default Footer;
