const CheckEmail = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Check Your Email</h2>
        <p className="text-gray-600">
          If this email exists, we’ve sent a password reset link. Please check
          your inbox and follow the instructions.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
