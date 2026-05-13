import { useEffect, useState } from "react";
import React from "react";
import API from "../api/axios";

export default function Contacts({ onSelect }) {
  const [users, setUsers] = useState([]);
  const [activeId, setActiveId] = useState(null);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await API.get("/user/all");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Fetch users failed", err);
      setUsers([]);
    }
  };
  fetchUsers();
}, []);


  const handleSelect = async (user) => {
    try {
      const res = await API.post("/conversation", {
        userId: user._id,
      });

      setActiveId(user._id);

          // console.log("Conversation response:", res.data); // 👈 ADD THIS

onSelect({
  ...user,
  conversationId: res.data._id,
});

localStorage.setItem(
  "lastChat",
  JSON.stringify({
    userId: user._id,
    conversationId: res.data._id,
  })
);

    } catch (err) {
      console.error("Conversation error", err);
    }
  };

  return (
<div className="h-full flex flex-col">


  <div className="p-4 border-b">
    <input
      placeholder="Search"
      className="w-full px-4 py-2 rounded-lg bg-gray-100 text-sm outline-none"
    />
  </div>


  <div className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-hide">
    {users.map((user) => (
      <div
        key={user._id}
          onClick={() => handleSelect(user)}
        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer
  ${
    activeId === user._id
      ? "bg-indigo-50"
      : "hover:bg-gray-100"
  }`}
      >
        <img
          src={user.avatar}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-medium text-sm">{user.username}</p>

        </div>
      </div>
    ))}
  </div>
</div>

  );
}
