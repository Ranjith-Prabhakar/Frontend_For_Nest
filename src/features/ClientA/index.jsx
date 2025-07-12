import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { CLIENT_A_SERVICE } from "../../../app/constants";

export default function ClientA() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Client-A</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessageToB}>Send</button>

      <div>
        <h3>Messages from Client B:</h3>
        {receivedMessages.map((msg, idx) => (
          <div key={idx}>{msg.message}</div>
        ))}
      </div>
    </div>
  );
}
