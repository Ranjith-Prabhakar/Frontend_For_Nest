import axios from "axios";
import React, { useState } from "react";

export default function ClientB() {
  let [message, setMessage] = useState("");
  async function sendMessageToA() {
    try {
      let response = await axios.post("http://localhost:3001/message-to-a", {
        sender: "clientA",
        message,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessageToA()}>Send</button>
    </div>
  );
}
