import React from "react";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/cartSlice/cartSlice";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

interface Product {
  _id: string;
  productName: string;
  productPrice: string | number;
  productDiscountPrice?: string | number; // discount percent (e.g., "10" means 10%)
  productImage?: string;
  productModel?: {
    modelName?: string;
  };
  productCategory?: {
    categoryName?: string;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useNavigate();
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // Utility to parse numeric values robustly
  const parseNumeric = (v: any) => {
    if (v == null) return 0;
    const s = String(v).replace(/[^0-9.-]+/g, "");
    const n = Number.parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

  const originalPrice = parseNumeric(product.productPrice);
  const discountPercent = parseNumeric(product.productDiscountPrice);
  const finalPriceNumber =
    discountPercent > 0
      ? originalPrice - (originalPrice * discountPercent) / 100
      : originalPrice;
  const finalPrice = finalPriceNumber.toFixed(2);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.error("Please Login first before Adding product");
      return;
    }
    // dispatch to redux
    try {
      dispatch(
        addToCart({
          id: product._id,
          name: product.productName,
          price: Number(finalPrice),
          image: product.productImage || null,
          quantity: 1,
        })
      );
      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Could not add to cart");
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router(`/product/${product._id}`);
  };

  return (
    <div
      className="group relative bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => router(`/product/${product._id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") router(`/product/${product._id}`);
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.productImage || "/placeholder.svg"}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='20'>No image</text></svg>")
          }
        />

        {/* Discount badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
            -{discountPercent}%
          </div>
        )}

        {/* Quick action overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleAddToCart}
            className="bg-white text-black p-3 rounded-full hover:opacity-90 transition-colors shadow"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={handleViewDetails}
            className="bg-white text-black p-3 rounded-full hover:opacity-90 transition-colors shadow"
            aria-label="View details"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Product name */}
        <h3 className="font-semibold text-card-foreground line-clamp-2 text-balance leading-tight">
          {product.productName}
        </h3>

        {/* Rating stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">(4.0)</span>
        </div>

        {/* Model & Category */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{product.productModel?.modelName ?? "Model"}</span>
          {product.productCategory?.categoryName && (
            <>
              <span>•</span>
              <span>{product.productCategory.categoryName}</span>
            </>
          )}
        </div>

        {/* Price section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ${finalPrice}
            </span>
            {discountPercent > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
            aria-label="Add product to cart"
          >
            Add to Cart
          </button>
          <button
            onClick={handleViewDetails}
            className="px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
            aria-label="View product"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
