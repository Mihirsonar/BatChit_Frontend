import { motion } from "framer-motion";
import React from "react";
// import { slideRight } from "../utils/animations";


export default function MediaPanel({ user }) {
  return (
<div className="h-full flex flex-col p-4">
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-semibold">Group Info</h3>
    <button>✕</button>
  </div>

  <div className="flex items-center gap-3 mb-6">
    {/* <img src={chat.avatar} className="w-14 h-14 rounded-full" /> */}
    <div>
      {/* <p className="font-medium">{chat.username}</p> */}
      <p className="text-xs text-gray-500">23 members</p>
    </div>
  </div>

  <div className="space-y-3 text-sm text-gray-600">
    <div>📷 Photos</div>
    <div>🎥 Videos</div>
    <div>📁 Files</div>
    <div>🔗 Links</div>
  </div>
</div>
  );
}
