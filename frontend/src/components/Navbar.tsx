import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { User } from "lucide-react";
// import { useSelector } from 'react-redux';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const cartItems = useSelector((state: any) => state.cart.items);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 border-b w-full">
      <NavLink to="/">
        <img src={logo} alt="logo" className="w-[150px]" />
      </NavLink>

      {/* Desktop Navbar */}
      <div className="hidden md:flex gap-2">
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                  : "font-semibold hover:text-sky-600"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                  : "font-semibold hover:text-sky-600"
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                  : "font-semibold hover:text-sky-600"
              }
            >
              Cart <span className="text-sky-400 ml-2"></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                  : "font-semibold hover:text-sky-600"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                  : "font-semibold hover:text-sky-600"
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <User />
          </li>
        </ul>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center ">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50">
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li>
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-sky-600"
                    : "font-semibold text-gray-600 hover:text-sky-600"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-sky-600"
                    : "font-semibold text-gray-600 hover:text-sky-600"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-sky-600"
                    : "font-semibold text-gray-600 hover:text-sky-600"
                }
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-sky-600"
                    : "font-semibold text-gray-600 hover:text-sky-600"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                    : "font-semibold hover:text-sky-600"
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
