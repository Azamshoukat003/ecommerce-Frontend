import React, { useState } from "react";

const ProfileTab: React.FC = () => {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1234567890",
    password: "********",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Profile updated:", profile);
  };

  return (
    <div className="shadow-xl rounded-2xl bg-white dark:bg-gray-800 p-6 mt-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">My Profile</h2>
      <div className="space-y-5">
        {["name", "email", "phone", "password"].map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-1 capitalize">
              {field}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              value={profile[field as keyof typeof profile]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full border rounded-lg py-3 px-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-indigo-500"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
