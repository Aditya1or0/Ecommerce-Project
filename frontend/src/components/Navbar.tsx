import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, User, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store";
import { toast } from "react-toastify";
import { logout } from "../redux/authSlice";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLLIElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector((state: RootState) => state.auth);

  // Handle clicks outside the user menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login", { replace: true });
      toast.success("Logout successful!");
      closeMobileMenu();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 border-b w-full">
      <NavLink to="/" className="flex items-center">
        <ShoppingBag className="h-10 w-10 text-cyan-600" />
        <span className="ml-2 text-2xl font-bold text-gray-800">ShopiFy</span>
      </NavLink>

      {/* Desktop Navbar */}
      <div className="hidden md:flex gap-2">
        <ul className="flex space-x-6">
          {token && (
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
          )}

          {token && (
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
          )}

          {token && (
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
          )}

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
                className="font-semibold hover:text-sky-600"
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
            <li onClick={toggleUserMenu}>
              <NavLink to={"/dashboard"}>
                <div className="bg-cyan-800 rounded-full p-1 h-7 w-7 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center gap-2">
        {token && (
          <NavLink
            to={"/dashboard"}
            className="flex justify-center items-center rounded-full w-8 h-8 bg-cyan-800 text-white cursor-pointer"
            onClick={toggleUserMenu}
          >
            <User className="h-4 w-4" />
          </NavLink>
        )}
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
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-40">
          <ul className="flex flex-col items-center py-4 space-y-4">
            {token && (
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
            )}
            {token && (
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
            )}

            {token && (
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
            )}

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
                  className="font-semibold hover:text-sky-600"
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
