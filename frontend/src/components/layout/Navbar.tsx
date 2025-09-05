"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, User, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { toast } from "react-toastify";
import { logout } from "../../redux/authSlice";
import { fetchCart } from "../../redux/cartSlice";
import { jwtDecode, type JwtPayload } from "jwt-decode";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLLIElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector((state: RootState) => state.auth);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.sub;
      if (userId) {
        dispatch(fetchCart(Number(userId)));
      }
    }
  }, [token, dispatch]);

  const fetchUserAvatar = useCallback(async () => {
    try {
      if (!token) return;

      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.sub;

      if (!userId) return;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data");

      const userData = await response.json();
      setUserAvatar(userData.avatar || null);
    } catch (error) {
      console.error("Error fetching user avatar:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserAvatar();
    }
  }, [token, fetchUserAvatar]);

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

  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      performLogout();
    }, 500); // matches animation duration
  };

  const performLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login", { replace: true });
      toast.success("Logout successful!");
      closeMobileMenu();
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false); // reset animation state
    }
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 border-b w-full">
      <NavLink to="/" className="flex items-center">
        <img src="./cart1.png" alt="" className="h-10 w-10" />
        <span className="ml-2 text-2xl font-bold text-gray-800 flex items-center gap-1">
          <img src="./letter-s.png" alt="" className="h-9" />
          hopiFy
        </span>
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
                  `relative inline-block ${
                    isActive ? "text-sky-600" : "hover:text-sky-600"
                  }`
                }
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-2 text-xs bg-sky-500 text-white rounded-full px-1 py-0.5 leading-none">
                      {totalQuantity}
                    </span>
                  )}
                </div>
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
                onClick={handleLogoutClick}
                className="font-semibold hover:text-sky-600"
              >
                <div className="flex items-center relative overflow-hidden">
                  <LogOut
                    className={`h-5 w-5 mr-1 transition-transform duration-500 ${
                      isLoggingOut ? "translate-x-4" : ""
                    }`}
                  />
                  <span
                    className={`transition-opacity duration-300 ${
                      isLoggingOut ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    Logout
                  </span>
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
            <li ref={userButtonRef} onClick={toggleUserMenu}>
              <NavLink to={"/dashboard"}>
                {userAvatar ? (
                  <img
                    src={
                      userAvatar.startsWith("http")
                        ? userAvatar
                        : `${import.meta.env.VITE_BACKEND_URL}/${userAvatar}`
                    }
                    alt="Profile"
                    className="h-7 w-7 rounded-full object-cover border border-cyan-600"
                  />
                ) : (
                  <div className="bg-cyan-800 rounded-full p-1 h-7 w-7 flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                )}
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
            className="flex justify-center items-center rounded-full w-8 h-8 overflow-hidden"
            onClick={toggleUserMenu}
          >
            {userAvatar ? (
              <img
                src={
                  userAvatar.startsWith("http")
                    ? userAvatar
                    : `${import.meta.env.VITE_BACKEND_URL}/${userAvatar}`
                }
                alt="Profile"
                className="h-8 w-8 object-cover"
              />
            ) : (
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white w-full h-full flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            )}
          </NavLink>
        )}
        {/* changes to be add that is its admin then admin panel can view
        {token && (
          <NavLink
            to={"/admin-panel"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                : "font-semibold hover:text-sky-600"
            }
          >
            Admin Panel
          </NavLink>
        )} */}
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
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-sky-600 border-b-2 border-sky-600"
                      : "font-semibold hover:text-sky-600"
                  }
                >
                  Cart{" "}
                  <span className="text-sky-400 ml-2">{totalQuantity}</span>
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

            {/*  Mobile Logout Button with animation */}
            <li>
              {token ? (
                <button
                  onClick={handleLogoutClick}
                  className="font-semibold hover:text-sky-600"
                >
                  <div className="flex items-center relative overflow-hidden">
                    <LogOut
                      className={`h-5 w-5 mr-1 transition-transform duration-500 ${
                        isLoggingOut ? "translate-x-4" : ""
                      }`}
                    />
                    <span
                      className={`transition-opacity duration-300 ${
                        isLoggingOut ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      Logout
                    </span>
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
