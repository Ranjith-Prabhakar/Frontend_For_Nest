import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { CLIENT_B_SERVICE } from "../../../app/constants";

export default function ClientB() {
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
      <h1>Client-B</h1>
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
