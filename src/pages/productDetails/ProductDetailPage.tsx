// src/pages/ProductDetailPage.tsx  (updated)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from "lucide-react";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ProductCarousel from "../../components/productCarousel/ProductCarousel";
import axios from "axios";

import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/cartSlice/cartSlice";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [selectedTab, setSelectedTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");

  const normalizeForCarousel = (data: any[] = []) =>
    data.map((p) => ({
      _id: p._id,
      productName: p.productName,
      productPrice: p.productPrice,
      productDiscountPrice: p.productDiscountPrice,
      productImage:
        p.productImage ||
        (p.extraImages && p.extraImages[0]) ||
        "/placeholder.svg",
      productModel: p.productModel,
      productCategory: p.productCategory,
    }));

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/auth/getproduct/${id}`);
        if (res?.data?.success) {
          const prod = res.data.data;
          setProduct(prod);
          setSelectedImage(0);

          // try find a category identifier (works if category is object or string)
          const catId =
            prod?.productCategory?._id ??
            prod?.productCategory?.categoryName ??
            prod?.productCategory ??
            null;

          if (catId) {
            fetchRelatedProducts(catId, prod._id);
          } else {
            // If no category id, clear related products
            setRelatedProducts([]);
          }
        } else {
          console.warn("getproduct returned success=false:", res?.data);
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (
      catIdentifier: string | number,
      currentProductId: string
    ) => {
      try {
        const res = await axios.get(`${API_URL}/auth/related-products/${catIdentifier}`);
        if (res?.data?.success) {
          let data = res.data.data || [];
          if (!Array.isArray(data)) {
            console.warn("related-products returned non-array:", data);
            data = [];
          }

          // normalize to shape used by carousel / ProductCard
          const mapped = normalizeForCarousel(data).filter(
            (p) => p._id !== currentProductId
          );
          setRelatedProducts(mapped);
        } else {
          console.warn("related-products success=false:", res?.data);
          setRelatedProducts([]);
        }
      } catch (err) {
        console.error("Error fetching related products:", err);
        setRelatedProducts([]);
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">Product Not Found</h2>
            <p className="text-gray-500 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition"
            >
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Build images list with fallback
  const images = [product.productImage, ...(product.extraImages || [])].filter(
    Boolean
  );
  if (images.length === 0) images.push("/placeholder.svg");

  // Price & discount calculation (discount treated as percent)
  const discount = Number(product.productDiscountPrice) || 0;
  const price = Number(product.productPrice) || 0;
  const finalPrice =
    discount > 0
      ? (price - (price * discount) / 100).toFixed(2)
      : price.toFixed(2);

  // Treat missing inStock as available
  const inStock = typeof product.inStock === "boolean" ? product.inStock : true;

  // Add to cart payload builder
  const buildCartPayload = () => ({
    id: product._id as string,
    name: product.productName as string,
    price: Number(finalPrice),
    image: product.productImage || null,
    quantity,
  });

  // Handlers
  const handleAddToCart = () => {
    if (!product) return;
    if (!isLoggedIn) {
      toast.error("Please Login First");
      return;
    }
    dispatch(addToCart(buildCartPayload()));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBuyNow = () => {
    if (!product) return;
    dispatch(addToCart(buildCartPayload()));
    navigate("/cart"); // go to cart immediately
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <button
            onClick={() => navigate("/")}
            className="hover:text-gray-900 dark:hover:text-white"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/shop")}
            className="hover:text-gray-900 dark:hover:text-white"
          >
            Shop
          </button>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">
            {product.productName}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              className="relative aspect-square bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              layoutId="main-image"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                />
              </AnimatePresence>

              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                  -{discount}% OFF
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                    i === selectedImage
                      ? "border-indigo-600 shadow-lg"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.productName} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{product.productModel?.modelName}</span>
                <span>•</span>
                <span>{product.productCategory?.categoryName}</span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 3)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating ?? "3.0"} ({product.reviews ?? 0} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                ${finalPrice}
              </span>
              {discount > 0 && (
                <span className="text-lg text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded text-sm font-semibold">
                  Save ${(price - Number(finalPrice)).toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  inStock ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`text-sm font-medium ${
                  inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>

                <button
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-3 px-6 rounded-lg hover:opacity-95 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            {product.features?.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <Check className="w-4 h-4 text-indigo-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium">2 Year Warranty</p>
                  <p className="text-xs text-gray-500">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium">30-Day Returns</p>
                  <p className="text-xs text-gray-500">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-8">
              {(["description", "specifications", "reviews"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium capitalize transition-colors ${
                      selectedTab === tab
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </nav>
          </div>

          <div className="py-8">
            {selectedTab === "description" && (
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                {product.description}
              </div>
            )}

            {selectedTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">
                    Technical Specifications
                  </h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Model</dt>
                      <dd className="font-medium">
                        {product.productModel?.modelName}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Category</dt>
                      <dd className="font-medium">
                        {product.productCategory?.categoryName}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {selectedTab === "reviews" && (
              <div className="text-center py-8">
                <p className="text-gray-500">Reviews coming soon...</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Related products</h3>
            <ProductCarousel
              title="Related Products"
              products={relatedProducts}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
