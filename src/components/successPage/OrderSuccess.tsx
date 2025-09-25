import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
}

interface OrderData {
  orderId: string;
  createdAt?: string;
  items?: OrderItem[];
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  paymentMethod?: string;
}

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    // Priority: location.state (if checkout passed it) -> sessionStorage -> fallback
    const fromState = (location.state as any)?.order as OrderData | undefined;
    if (fromState) {
      setOrder(fromState);
      // clean session fallback
      try {
        sessionStorage.removeItem("lastOrder");
      } catch {}
      return;
    }

    try {
      const saved = sessionStorage.getItem("lastOrder");
      if (saved) {
        setOrder(JSON.parse(saved) as OrderData);
        // optionally remove to avoid reusing
        sessionStorage.removeItem("lastOrder");
        return;
      }
    } catch (err) {
      console.warn("OrderSuccess: failed to read sessionStorage", err);
    }

    // fallback empty order
    setOrder(null);
  }, [location.state]);

  // easy helper to format currency
  const f = (v?: number) => (v == null ? "--" : `$${v.toFixed(2)}`);

  const handleContinue = () => navigate("/shop");
  const handleViewOrders = () => navigate("/my-orders");

  const generatedOrderId = () => {
    // produce a short readable id if none
    return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Thank you — your order is confirmed!
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              We’ve emailed you an order confirmation.
            </p>

            <div className="inline-flex items-center gap-3 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-4 py-2 rounded-md mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4"
                />
              </svg>
              <span className="font-medium">Order placed successfully</span>
            </div>

            <div className="space-y-4 text-left">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Order number</span>
                <span className="font-medium">
                  {order?.orderId ?? generatedOrderId()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Placed on</span>
                <span className="font-medium">
                  {order?.createdAt ?? new Date().toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Payment</span>
                <span className="font-medium">
                  {order?.paymentMethod ?? "Cash on Delivery"}
                </span>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Items</h3>
                {order?.items && order.items.length > 0 ? (
                  <div className="space-y-3">
                    {order.items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={it.image || "/placeholder.svg"}
                            alt={it.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <div className="text-sm font-medium">{it.name}</div>
                            <div className="text-xs text-gray-500">
                              Qty: {it.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="font-medium">
                          {f(it.price * it.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    No item details available.
                  </div>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="font-medium">{f(order?.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Shipping</span>
                  <span className="font-medium">{f(order?.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Tax</span>
                  <span className="font-medium">{f(order?.tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{f(order?.total)}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleContinue}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleViewOrders}
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
                >
                  View My Orders
                </button>
              </div>

              <div className="text-xs text-gray-400 mt-3">
                If you need support, contact us at support@example.com with your
                order number.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
