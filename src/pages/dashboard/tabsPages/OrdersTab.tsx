import React from "react";

const OrdersTab: React.FC = () => {
  return (
    <div className="shadow-xl rounded-2xl bg-white dark:bg-gray-800 p-6 mt-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">My Orders</h2>
      <p className="text-gray-600 dark:text-gray-300">
        You have no recent orders. Once you start shopping, your order history
        will appear here.
      </p>
    </div>
  );
};

export default OrdersTab;
