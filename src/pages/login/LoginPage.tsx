import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Image from "../../assets/sign.png";
import GoogleLogo from "../../assets/googlelogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../lib/toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";

import { checkAuth } from "../../redux/authSlice/authSlice";
import axios from "axios";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const loginUser = async () => {
    console.log("clicked");
    try {
      if ([email, password].some((val) => val?.trim() === "")) {
        return showError("Please Add values in all fields");
      }

      const response = await axios.post("/api/v1/users/login", {
        email: email,
        password: password,
        rememberMe: rememberMe,
      });

      // console.log("User registered:", response.data.data.accessToken);
      localStorage.setItem("accessToken", response.data.data.accessToken);
      if (response?.data.success) {
        showSuccess("Loggin Successfuly");
        dispatch(checkAuth());

        navigate("/");
      }
    } catch (err: any) {
      if (err.response) {
        // JSON from backend
        console.log("Errors:", err.response?.data.message);
        showError(err.response?.data.message);
      } else {
        console.log("Error:", err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send ID token to backend
      const res = await axios.post("/auth/google-login", { idToken });
      console.log(res?.data?.data);
      if (res?.data?.success) {
        dispatch(checkAuth());
        localStorage.setItem("token", res?.data.data.accessToken);
        navigate("/");
      }
    } catch (err) {
      // console.error("Google login error", err);
      showError(err?.response?.data?.message || "Invalid User");
    }
  };
  return (
    <>
      <Navbar />
      <section className="flex flex-col md:flex-row min-h-screen py-10 dark:bg-gray-900">
        <img
          src={Image}
          alt="Login visual"
          className="md:w-1/2 flex items-center justify-center object-contain"
        />

        {/* Right side with login form */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-white dark:bg-gray-900 p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Welcome Back
            </h2>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                loginUser();
              }}
            >
              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-zinc-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-zinc-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-md border border-gray-300 dark:border-zinc-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-gray-700 dark:text-gray-300 ml-2">
                  Remember Me
                </span>
                <span className="text-gray-700 dark:text-gray-300 ml-2">
                  <Link to="/forgot-password">Forget Password</Link>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg"
              >
                Login
              </button>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-600" />
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  or
                </span>
                <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-600" />
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-md border border-gray-300 dark:border-zinc-600 flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
                onClick={handleGoogleLogin}
              >
                <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LoginPage;
