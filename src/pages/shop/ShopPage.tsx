import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard"; // Reusable card component
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const sortOptions = ["Default", "Price: Low to High", "Price: High to Low"];
const API_URL = import.meta.env.VITE_API_URL;


const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [priceRange, setPriceRange] = useState([0, 5000]); // Adjust max as needed
  const [loading, setLoading] = useState(false);

  // Fetch products from API
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/auth/get-products`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response?.data?.success) {
        setProducts(response.data.data || []);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Collect unique categories from API data (safe guard)
  const categories = [
    "All",
    ...Array.from(
      new Set(
        products
          .map((p) => p.productCategory?.categoryName)
          .filter((c) => typeof c === "string")
      )
    ),
  ];

  // Utility to parse price (strip $ commas etc)
  const parsePrice = (val: any) => {
    if (val == null) return 0;
    const s = String(val).replace(/[^0-9.-]+/g, "");
    const n = Number.parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

  // Filtering + sorting
  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.productCategory?.categoryName === selectedCategory
      );
    }

    filtered = filtered.filter(
      (p) =>
        parsePrice(p.productPrice) >= priceRange[0] &&
        parsePrice(p.productPrice) <= priceRange[1]
    );

    if (sortBy === "Price: Low to High") {
      filtered.sort(
        (a, b) => parsePrice(a.productPrice) - parsePrice(b.productPrice)
      );
    } else if (sortBy === "Price: High to Low") {
      filtered.sort(
        (a, b) => parsePrice(b.productPrice) - parsePrice(a.productPrice)
      );
    }

    return filtered;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 lg:px-16 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop Our Collection
        </h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          {/* Categories */}
          <div className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-transparent border-gray-400 dark:border-white"
                } hover:shadow`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <label className="text-sm">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-4">
            <label className="text-sm">Price:</label>
            <input
              type="range"
              min={0}
              max={5000}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([0, Number.parseInt(e.target.value, 10)])
              }
              className="w-40"
            />
            <span className="text-sm font-medium">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-500">Loading...</div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filterProducts().map((product) => (
              <motion.div
                layout
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
