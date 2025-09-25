import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand and Newsletter */}
        <div>
          <h2 className="text-xl font-bold mb-3">ShopNest</h2>
          <p className="text-sm mb-4">
            Your one-stop shop for everything tech and trendy.
          </p>

          <form className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-500 transition shadow">
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Order Tracking
              </a>
            </li>
          </ul>
        </div>

        {/* Social and Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mb-4">
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <FaLinkedinIn />
            </a>
          </div>

          <ul className="text-sm space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-zinc-700 text-center text-sm py-4">
        © {new Date().getFullYear()} ShopNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
