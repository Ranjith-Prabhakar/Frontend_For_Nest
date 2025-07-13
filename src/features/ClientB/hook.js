import { useEffect, useRef, useState } from "react";
import { CLIENT_B_SERVICE } from "../../../app/constants";
import { io } from "socket.io-client";
import axios from "axios";

export function useClientBHook() {
  let [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const socket = io(CLIENT_B_SERVICE, {
      withCredentials: true,
    });

    socket.on("message-to-client-b", (data) => {
      console.log("Real-time message from client A:", data);
      setReceivedMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  async function sendMessageToA() {
    try {
      await axios.post(`${CLIENT_B_SERVICE}/message-to-a`, {
        sender: "clientB",
        message,
      });
      setMessage("");
      inputRef.current.focus();
    } catch (error) {
      console.log(error);
    }
  }
  return [message, setMessage, receivedMessages, inputRef, sendMessageToA];
}
