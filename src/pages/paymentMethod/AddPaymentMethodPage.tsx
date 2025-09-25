import React, { useState } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCreditCard,
} from "react-icons/fa";
// import { SiJazz, SiEasypaisa } from "react-icons/si";
import { MdOutlinePayments } from "react-icons/md";
import { Modal, Box, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";

interface AddPaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "jazzcash" | "easypaisa"
  >("card");

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 w-[95%] md:w-[600px] max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <MdOutlinePayments className="text-indigo-600 dark:text-indigo-400" />
            Add Payment Method
          </h2>
          <IconButton
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300"
          >
            <IoClose size={24} />
          </IconButton>
        </div>

        {/* Selection Buttons */}
        <div className="flex space-x-2 md:space-x-4 mb-8">
          <button
            onClick={() => setSelectedMethod("card")}
            className={`flex-1 py-3 flex items-center justify-center rounded-lg border transition ${
              selectedMethod === "card"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <FaCreditCard className="mr-2" /> Card
          </button>
          <button
            onClick={() => setSelectedMethod("jazzcash")}
            className={`flex-1 py-3 flex items-center justify-center rounded-lg border transition ${
              selectedMethod === "jazzcash"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            JazzCash
          </button>
          <button
            onClick={() => setSelectedMethod("easypaisa")}
            className={`flex-1 py-3 flex items-center justify-center rounded-lg border transition ${
              selectedMethod === "easypaisa"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            EasyPaisa
          </button>
        </div>

        {/* Form Inputs */}
        {selectedMethod === "card" && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block font-semibold mb-1">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full border rounded-lg py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:outline-indigo-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1 text-xl text-gray-500 dark:text-gray-300">
                  <FaCcVisa />
                  <FaCcMastercard />
                  <FaCcAmex />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Expiration</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full border rounded-lg py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:outline-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">CVC</label>
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full border rounded-lg py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:outline-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "jazzcash" && (
          <div className="animate-fade-in space-y-4">
            <div>
              <label className="block font-semibold mb-1">
                JazzCash Account Number
              </label>
              <input
                type="text"
                placeholder="03XXXXXXXXX"
                className="w-full border rounded-lg py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:outline-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:outline-indigo-500"
              />
            </div>
          </div>
        )}

        {selectedMethod === "easypaisa" && (
          <div className="animate-fade-in space-y-4">
            <div>
              <label className="block font-semibold mb-1">
                EasyPaisa Account Number
              </label>
              <input
                type="text"
                placeholder="03XXXXXXXXX"
                className="w-full border rounded-lg py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:outline-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:outline-indigo-500"
              />
            </div>
          </div>
        )}

        <button
          onClick={onSave}
          className="mt-8 w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition"
        >
          Save Payment Method
        </button>
      </Box>
    </Modal>
  );
};

export default AddPaymentMethodModal;
