import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router";

export default function Profile() {
const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    username: "",
    bio: "",
    avatar: "",
  });

  // Fetch logged-in user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/me");
        setUser(res.data);
        setForm({
          username: res.data.username,
          bio: res.data.bio || "",
          avatar: res.data.avatar || "",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const saveProfile = async () => {
  try {
    const res = await API.put("/user/me", form);
    setUser(res.data); 
    setEdit(false);

    navigate("/");
  } catch (err) {
    console.error("Update failed", err);
  }
};


  if (!user) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-[380px]"
      >
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-28 h-28 mx-auto rounded-full bg-gray-200 overflow-hidden mb-4"
        >
          {form.avatar ? (
            <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No Image
            </div>
          )}
        </motion.div>

        {edit && (
          <input
            name="avatar"
            placeholder="Avatar image URL"
            value={form.avatar}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mb-3"
          />
        )}

        {/* Username */}
        {edit ? (
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mb-3"
          />
        ) : (
          <h2 className="text-xl font-bold text-center mb-1">
            {user.username}
          </h2>
        )}

        {/* Email */}
        <p className="text-center text-sm text-gray-500 mb-3">
          {user.email}
        </p>

        {/* Bio */}
        {edit ? (
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell something about yourself..."
            className="w-full border rounded-lg px-3 py-2 mb-4"
          />
        ) : (
          <p className="text-center text-gray-600 mb-4">
            {user.bio || "No bio added"}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          {edit ? (
            <>
              <button
                onClick={saveProfile}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEdit(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
