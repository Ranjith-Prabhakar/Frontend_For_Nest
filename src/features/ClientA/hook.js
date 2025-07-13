import { useEffect, useRef, useState } from "react";
import { CLIENT_A_SERVICE } from "../../../app/constants";
import { io } from "socket.io-client";
import axios from "axios";

export function useClientAHook() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const socket = io(CLIENT_A_SERVICE, {
      withCredentials: true,
    });

    socket.on("message-to-client-a", (data) => {
      console.log("Real-time message from client B:", data);
      setReceivedMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  async function sendMessageToB() {
    try {
      await axios.post(`${CLIENT_A_SERVICE}/message-to-b`, {
        sender: "clientA",
        message,
      });

      setMessage("");
      inputRef.current.focus();
    } catch (error) {
      console.log(error);
    }
  }

  return [message, setMessage, receivedMessages, inputRef, sendMessageToB];
}
