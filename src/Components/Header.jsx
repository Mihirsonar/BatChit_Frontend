import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext"; 
import React from "react";

export default function Header() {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-black text-white ">
      <h1 className="text-xl font-bold">BatChit</h1>

      <div className="relative" ref={dropdownRef}>
        {/* Avatar */}
        <img
          onClick={() => setOpen((prev) => !prev)}
          src={
            user?.avatar ||
            "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff"
          }
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover cursor-pointer border border-gray-600"
        />

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-100"
            >
              👤 Profile
            </button>

            <button
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-100"
            >
              ⚙️ Settings
            </button>

            <hr />

            <button
              onClick={logout}
              className="w-full px-4 py-3 text-left text-red-600 hover:bg-gray-100"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
