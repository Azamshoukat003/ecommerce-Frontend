import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;


const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // handle subscription logic here
    try {
      const response = await axios.post(
        `${API_URL}/auth/subscribe`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.data.success) {
        setEmail("");
        toast.success("Successfully Subscribed");
      }
    } catch (error) {
      console.error("Error fetching heroes:", error);
    }
    console.log("Subscribed with:", email);
  };

  return (
    <section className="bg-white-100  dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Stay Updated!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Subscribe to get the latest updates, exclusive deals, and product
          launches.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-2/3 px-5 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white bg-white dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-500 transition shadow-md hover:shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
