import React from "react";

interface Props {
  onAddPayment: () => void;
}

const PaymentTab: React.FC<Props> = ({ onAddPayment }) => {
  return (
    <div className="shadow-xl rounded-2xl bg-white dark:bg-gray-800 p-6 mt-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        My Payment Methods
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        You haven’t added any payment methods yet. Add a credit card, JazzCash,
        or EasyPaisa to simplify future checkouts.
      </p>
      <button
        onClick={onAddPayment}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
      >
        Add Payment Method
      </button>
    </div>
  );
};

export default PaymentTab;
