// src/components/GoogleLoginButton.tsx
import { useEffect } from "react";
import GoogleLogo from "../../assets/googlelogo.png";

import axios from "axios";

const GoogleLoginButton = () => {
  const handleGoogleResponse = (response) => {
    console.log("Google callback response:", response);
    if (!response?.credential) {
      console.error(
        "No credential returned — likely FedCM/cookie blocked or client_id mismatch."
      );
      return;
    }

    fetch("/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (window.google) {
      console.log(window.google, "go");
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
    }
  }, []);

  const handleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt(); // opens the Google One Tap or popup
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="w-full py-3 rounded-md border border-gray-300 dark:border-zinc-600 flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
    >
      <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
