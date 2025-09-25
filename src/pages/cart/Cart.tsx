// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../../components/footer/Footer";
// import Navbar from "../../components/navbar/Navbar";
// import Image1 from "../../assets/iphone.png";
// import Image2 from "../../assets/vivo.png";
// import { useNavigate } from "react-router-dom";

// const dummyCartItems = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     price: 59.99,
//     quantity: 2,
//     image: Image1,
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     price: 99.99,
//     quantity: 1,
//     image: Image2,
//   },
// ];

// const Cart = () => {
//   const [cartItems, setCartItems] = useState(dummyCartItems);
//   const navigate = useNavigate();

//   const handleQuantityChange = (id: number, value: number) => {
//     setCartItems((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
//     );
//   };

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const shipping = subtotal > 0 ? 10 : 0;
//   const total = subtotal + shipping;

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-8xl md:ml-5 px-8 py-8 text-gray-900 dark:text-white ">
//         <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

//         {/* Table Header */}
//         <div className="hidden md:grid grid-cols-4 gap-6 font-semibold text-lg border-b pb-4 mb-4">
//           <div>Product</div>
//           <div>Price</div>
//           <div>Quantity</div>
//           <div>Subtotal</div>
//         </div>

//         {/* Cart Items */}
//         {cartItems.map((item) => (
//           <div
//             key={item.id}
//             className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center border-b py-4"
//           >
//             {/* Product */}
//             <div className="flex items-center gap-4">
//               <img
//                 src={item.image || undefined}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded"
//               />
//               <span className="font-medium">{item.name}</span>
//             </div>

//             {/* Price */}
//             <div className="text-lg">${item.price.toFixed(2)}</div>

//             {/* Quantity */}
//             <div>
//               <input
//                 type="number"
//                 min="1"
//                 value={item.quantity}
//                 onChange={(e) =>
//                   handleQuantityChange(item.id, Number(e.target.value))
//                 }
//                 className="w-16 border rounded p-1 dark:bg-gray-800"
//               />
//             </div>

//             {/* Subtotal */}
//             <div className="text-lg font-semibold">
//               ${(item.quantity * item.price).toFixed(2)}
//             </div>
//           </div>
//         ))}

//         {/* Actions */}
//         <div className="flex justify-between items-center mt-8 flex-wrap gap-4">
//           <Link
//             to="/"
//             className="text-indigo-600 dark:text-indigo-400 hover:underline"
//           >
//             ← Return to Shop
//           </Link>
//           <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
//             Update Cart
//           </button>
//         </div>

//         {/* Summary */}
//         <div className="mt-10 border-t pt-6 md:flex justify-end">
//           <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 p-6 rounded shadow">
//             <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
//             <div className="flex justify-between mb-2">
//               <span>Subtotal:</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span>Shipping:</span>
//               <span>${shipping.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg border-t pt-3">
//               <span>Total:</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//             <button
//               className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
//               onClick={() => navigate("/checkout")}
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Cart;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
  removeFromCart,
  clearCart,
  CartItem,
} from "../../redux/cartSlice/cartSlice";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Dialog } from "@mui/material";
import ConfirmationDialog from "../../components/confirmationDialog/ConfirmationDialog";
// Utility: format number to currency
const formatCurrency = (v: number) => {
  return v.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export default function Cart() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 10) : 0; // free over $100
  const taxRate = 0.07;
  const tax = Math.round((subtotal * taxRate + Number.EPSILON) * 100) / 100;
  const total =
    Math.round((subtotal + shipping + tax + Number.EPSILON) * 100) / 100;

  const handleDecrease = (item: CartItem) => {
    if (item.quantity <= 1) return;
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleIncrease = (item: CartItem) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleQuantityInput = (item: CartItem, value: number) => {
    if (!Number.isFinite(value) || value < 1) return;
    dispatch(updateQuantity({ id: item.id, quantity: Math.floor(value) }));
  };

  const handleRemove = (id: string) => {
    if (!confirm("Remove this item from cart?")) return;
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    if (!confirm("Clear your cart? This cannot be undone.")) return;
    dispatch(clearCart());
  };
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  // open dialog
  const handleOpenDialog = (item: CartItem) => {
    setSelectedItem(item);
    setConfirmOpen(true);
  };

  // confirm delete
  const handleDelete = async () => {
    if (!selectedItem) return;
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 500)); // simulate delay
      dispatch(removeFromCart(selectedItem.id));
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setSelectedItem(null);
    }
  };
  const handleCheckout = () => {
    if (items.length === 0) {
      navigate("/");
      return;
    }
    // navigate to your checkout route; you can also pass order details
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <ConfirmationDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
        destructive
        title="Remove this item?"
        description={`Are you sure you want to remove "${selectedItem?.name}" from your cart?`}
        confirmLabel="Remove"
        cancelLabel="Keep"
      />

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold">Your Cart</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {items.length} item{items.length !== 1 ? "s" : ""} — ready when
                you are
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
              >
                ← Continue shopping
              </Link>
              {items.length > 0 && (
                <button
                  onClick={handleClear}
                  className="px-3 py-1 text-sm border rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                >
                  Clear cart
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list - left / main column (span 2) */}
            <div className="lg:col-span-2">
              {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-200 dark:border-gray-700 p-12 text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Looks like you haven't added anything yet. Explore our store
                    and add something you love.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                      {/* Product image */}
                      <div className="w-full sm:w-28 flex-shrink-0">
                        <img
                          src={item.image || undefined}
                          alt={item.name}
                          className="w-full h-28 object-contain rounded-md bg-gray-50 dark:bg-gray-900"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='18'>No image</text></svg>";
                          }}
                        />
                      </div>

                      {/* Product details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              SKU: {item.id}
                            </p>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-semibold">
                              {formatCurrency(item.price)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              each
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDecrease(item)}
                              className="p-1 w-8 h-8 flex items-center justify-center rounded-md border hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityInput(
                                  item,
                                  Number(e.target.value)
                                )
                              }
                              className="w-16 px-2 py-1 rounded-md border text-center dark:bg-gray-900"
                            />
                            <button
                              onClick={() => handleIncrease(item)}
                              className="p-1 w-8 h-8 flex items-center justify-center rounded-md border hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              +
                            </button>

                            <button
                              // onClick={() => handleRemove(item.id)}
                              onClick={() => handleOpenDialog(item)}
                              className="ml-4 text-sm text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold">
                              {formatCurrency(item.quantity * item.price)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              subtotal
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary - right column */}
            <aside className="rounded-lg border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Tax</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>

                <div className="border-t pt-4 mt-2 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-xl font-bold">
                      {formatCurrency(total)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-md shadow hover:from-indigo-500 hover:to-indigo-400"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/wishlist")}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Save for later
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Shipping calculated at checkout. Free shipping on orders over
                $100.
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
