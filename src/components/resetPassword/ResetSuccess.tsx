import { Link } from "react-router-dom";

const ResetSuccess = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Password Reset Successful
        </h2>
        <p className="text-gray-600 mb-6">
          Your password has been updated. You can now log in with your new
          password.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetSuccess;
