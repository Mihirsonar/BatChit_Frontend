import { useState } from "react";
import Contacts from "./Contacts";
import ChatWindow from "./ChatWindow";
import MediaPanel from "./Media";
import React from "react";  
export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex flex-1 overflow-hidden gap-4">
      <div className="w-[22%] bg-white rounded-2xl overflow-hidden">
        <Contacts onSelect={setSelectedChat} />
      </div>

      <div className="flex-1 bg-white rounded-2xl overflow-hidden">
        <ChatWindow chat={selectedChat} />
      </div>

      <div className="w-[26%] bg-white rounded-2xl overflow-hidden">
        <MediaPanel chat={selectedChat} />
      </div>
    </div>
  );
}
