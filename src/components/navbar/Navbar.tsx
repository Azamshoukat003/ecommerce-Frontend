import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice/authSlice";
import { showSuccess, showError } from "../../lib/toast";
import { checkAuth } from "../../redux/authSlice/authSlice";

import { AppDispatch } from "../../redux/store";
import { selectCartItems } from "../../redux/cartSlice/cartSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const cartQuantity = useSelector(
    (state: RootState) => selectCartItems(state).length
  );
  let { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logoutUser = async () => {
    try {
      const response = await axios.post("/api/v1/users/logout");

      // console.log("User registered:", response.data);
      if (response?.data?.success) {
        showSuccess(response?.data?.message || "User Logout Successfully");
      }
      dispatch(checkAuth());
    } catch (err: any) {
      if (err.response) {
        showError(err.response?.data.message);
      } else {
        console.log("Error:", err.message);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          ShopEase
        </Link>

        {/* Search bar (Desktop) */}
        <div className="hidden md:flex flex-1 mx-8 max-w-md">
          <div className="flex w-full bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md items-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-sm dark:text-white"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartQuantity}
            </span>
          </Link>

          {/* Auth / Profile */}
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-1 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="hover:scale-105 transition-all"
              >
                <UserCircleIcon className="h-7 w-7" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-lg text-sm">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/orders"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/dashboard/payment"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Payment Method
                  </Link>

                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={(e) => {
                      // setIsLoggedIn(false);
                      e.preventDefault();
                      isLoggedIn = false;
                      setShowProfileMenu(false);
                      logoutUser();
                      localStorage.removeItem("accessToken");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Toggle Theme"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="absolute top-0 right-0 w-72 h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Search (Mobile) */}
          <div className="flex w-full bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md items-center mb-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-sm dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/shop" className="hover:underline">
              Shop
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>

            <Link to="/cart" className="hover:underline">
              Cart
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button className="mt-4 w-[100%] px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="mt-2 px-4 py-2 w-[100%] rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard/profile"
                  className="block hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/orders"
                  className="block hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  My Orders
                </Link>
                <Link
                  to="/dashboard/payment"
                  className="block hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Payment Method
                </Link>

                <button
                  className="mt-4 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
                  onClick={(e) => {
                    e.preventDefault();
                    isLoggedIn = false;
                    setShowProfileMenu(false);
                    logoutUser();
                    localStorage.removeItem("accessToken");
                  }}
                >
                  Logout
                </button>
              </>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mt-4 px-4 py-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </Dialog>
    </header>
  );
};

export default Navbar;
