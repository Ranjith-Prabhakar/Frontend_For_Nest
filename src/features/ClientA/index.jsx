import axios from "axios";
import React, { useState } from "react";

export default function ClientA() {
  let [message, setMessage] = useState("");
  async function sendMessageToB() {
    try {
      let response = await axios.post("http://localhost:3000/message-to-b", {
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
      <button onClick={() => sendMessageToB()}>Send</button>
    </div>
  );
}
