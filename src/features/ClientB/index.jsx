import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ClientB() {
  let [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3001", {
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
      let response = await axios.post("http://localhost:3001/message-to-a", {
        sender: "clientB",
        message,
      });
      console.log(response);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }
  // return (
  //   <div>
  //     <input
  //       type="text"
  //       value={message}
  //       onChange={(e) => setMessage(e.target.value)}
  //     />
  //     <button onClick={() => sendMessageToA()}>Send</button>
  //   </div>
  // );

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessageToA}>Send</button>

      <div>
        <h3>Messages from Client A:</h3>
        {receivedMessages.map((msg, idx) => (
          <div key={idx}>{msg.message}</div>
        ))}
      </div>
    </div>
  );
}
