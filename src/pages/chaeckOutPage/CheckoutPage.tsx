import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/cartSlice/cartSlice";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCreditCard,
} from "react-icons/fa";
const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const subtotalFromStore = useAppSelector(selectCartSubtotal);

  // Billing form
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  // Payment & coupon
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("cod");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState<null | {
    code: string;
    percent: number;
  }>(null);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Derived prices
  const subtotal = useMemo(() => subtotalFromStore, [subtotalFromStore]);
  const shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 10; // free over $100
  const taxRate = 0.07;

  const discountPercent = couponApplied ? couponApplied.percent : 0;
  const discountAmount = Number(
    ((subtotal * discountPercent) / 100).toFixed(2)
  );
  const taxedAmount = Number(
    ((subtotal - discountAmount) * taxRate).toFixed(2)
  );
  const total = Number(
    (subtotal - discountAmount + shipping + taxedAmount).toFixed(2)
  );
  const order = {
    orderId: "ORD-123",
    subtotal,
    shipping,
    total,
    paymentMethod,
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "First name is required";
    if (!address.trim()) e.address = "Street address is required";
    if (!city.trim()) e.city = "City is required";
    if (!phone.trim()) e.phone = "Phone number is required";
    if (!email.trim()) e.email = "Email is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return toast.error("Enter a coupon code");

    // simple demo-coupons; adapt to real API
    const coupons: Record<string, number> = {
      SAVE10: 10,
      SAVE15: 15,
      FREESHIP: 1000, // a huge percent used to zero-out shipping (demo only)
    };

    if (coupons[code]) {
      const percent = coupons[code];
      setCouponApplied({ code, percent });
      toast.success(`Coupon ${code} applied (${percent}% off)`);
    } else {
      setCouponApplied(null);
      toast.error("Invalid coupon");
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill required billing fields");
      return;
    }

    // simulate payment / order creation
    if (paymentMethod === "bank") {
      // In real app: redirect to payment gateway or saved card flow
      toast.info("Redirecting to payment gateway...");
      // simulate: navigate to external or internal payment page
      setTimeout(() => {
        toast.success("Payment successful (simulated)");
        dispatch(clearCart());
        // navigate("/order-success");

        navigate("/order-success", { state: { order } });
      }, 900);
    } else {
      // Cash on Delivery - create order and clear cart
      toast.success("Order placed — Cash on Delivery");
      dispatch(clearCart());
      navigate("/order-success");
    }
  };

  const handleRemove = (id: string) => dispatch(removeFromCart(id));
  const handleUpdateQty = (id: string, qty: number) =>
    dispatch(updateQuantity({ id, quantity: Math.max(1, qty) }));

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center p-6 md:p-12 gap-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Billing Details */}
        <div className="flex-1 max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Billing Details
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder="First Name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full border rounded p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>

            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border rounded p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <div>
              <input
                type="text"
                placeholder="Street Address*"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full border rounded p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            <input
              type="text"
              placeholder="Apartment, floor, etc. (optional)"
              value={apt}
              onChange={(e) => setApt(e.target.value)}
              className="w-full border rounded p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <div>
              <input
                type="text"
                placeholder="Town/City*"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`w-full border rounded p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.city ? "border-red-500" : ""
                }`}
              />
              {errors.city && (
                <p className="text-xs text-red-500 mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full border rounded p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Save this information for faster check-out next time
              </span>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="flex-1 max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="text-gray-800 dark:text-gray-200">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.price.toFixed(2)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() =>
                              handleUpdateQty(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1 border rounded disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQty(
                                item.id,
                                Number(e.target.value || 1)
                              )
                            }
                            className="w-12 text-center border rounded px-1"
                          />
                          <button
                            onClick={() =>
                              handleUpdateQty(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 border rounded"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="ml-3 text-sm text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-gray-800 dark:text-gray-200 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Discount ({couponApplied?.code}):</span>
                  <span>- ${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Estimated Tax:</span>
                <span>${taxedAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold text-gray-800 dark:text-white">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Payment Method
              </h3>

              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                <span className="text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                  <span>Bank</span>

                  <FaCcMastercard />
                  <FaCreditCard />
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Cash on Delivery
                </span>
              </div>

              {/* Coupon */}
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Apply Coupon
                </button>
              </div>

              {/* Place Order */}
              <button
                disabled={cartItems.length === 0}
                onClick={handlePlaceOrder}
                className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 disabled:opacity-50"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
