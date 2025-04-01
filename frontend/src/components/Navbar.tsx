import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, User, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store";
import { toast } from "react-toastify";
import { logout } from "../redux/authSlice";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector((state: RootState) => state.auth);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login", { replace: true });
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 border-b w-full">
      <NavLink to="/" className="flex items-center">
        <ShoppingBag className="h-8 w-8 text-cyan-600" />
        <span className="ml-2 text-xl font-bold text-gray-800">ShopiFy</span>
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
            {token ? (
              <button
                onClick={handleLogout}
                className="font-semibold text-sky-600 hover:text-sky-600"
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </div>
              </button>
            ) : (
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
            )}
          </li>
          {token && (
            <li className="flex justify-center items-center rounded-full w-8 h-8 bg-black text-white relative group">
              <User className="h-5 w-5" />
              <div className="absolute hidden group-hover:block top-full right-0 mt-2 z-10 text-black rounded bg-white shadow-lg">
                <NavLink
                  to="/dashboard"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-t-md"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-b-md"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </div>
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center">
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
                onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                    : "font-semibold hover:text-sky-600"
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
                    ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                    : "font-semibold hover:text-sky-600"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              {token ? (
                <button
                  onClick={handleLogout}
                  className="font-semibold text-sky-600 hover:text-sky-600"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-1" />
                    Logout
                  </div>
                </button>
              ) : (
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
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
