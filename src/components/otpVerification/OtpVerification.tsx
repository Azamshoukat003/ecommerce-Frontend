import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../lib/toast";
const API_URL = import.meta.env.VITE_API_URL;


const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/api/v1/users/verify-otp`, {
        email,
        otp,
      });

      console.log(res.data);
      setMessage(res?.data?.message);
      showSuccess(res?.data?.message);
      // redirect after verification
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: any) {
      setMessage(
        err.response?.data?.message || "Something went wrong. Try again."
      );
      showError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleVerify}
          className="bg-white shadow-lg rounded-2xl p-8 w-96"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Verify Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter the OTP sent to <b>{email}</b>
          </p>

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full p-3 border rounded-lg text-center tracking-widest text-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default OtpVerification;
