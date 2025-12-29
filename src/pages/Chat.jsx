import { useEffect } from "react";
import { useNavigate } from "react-router";
import ChatLayout from "../Components/Layout";

export default function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <ChatLayout />;
}
