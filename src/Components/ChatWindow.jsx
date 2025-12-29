import React from "react";
import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import socket from "../socket";

export default function ChatWindow({ chat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chat?.conversationId) return;

    const fetchMessages = async () => {
      const res = await API.get(`/message/${chat.conversationId}`);
      setMessages(res.data);
    };

    fetchMessages();
    socket.emit("joinConversation", chat.conversationId);

    return () => {
      socket.emit("leaveConversation", chat.conversationId);
      setMessages([]);
    };
  }, [chat]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      if (message.conversationId === chat?.conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [chat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !chat?.conversationId) return;

    const res = await API.post("/message", {
      conversationId: chat.conversationId,
      content: newMessage,
    });

    socket.emit("sendMessage", res.data);
    setNewMessage("");
  };

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a contact to start chatting 💬
      </div>
    );
  }

  const loggedInUserId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <img src={chat.avatar} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{chat.username}</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex gap-4 text-gray-400">
          <button>🔍</button>
          <button>📞</button>
          <button>⋮</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-hide">
        {messages.map((msg) => {
          const isMe = msg.sender._id === loggedInUserId;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow-sm
                  ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-900 rounded-bl-sm"
                  }`}
              >
                <p>{msg.content}</p>
                <span
                  className={`block text-[10px] mt-1 text-right
                    ${isMe ? "text-indigo-200" : "text-gray-500"}`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex p-4 border-t bg-white gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
