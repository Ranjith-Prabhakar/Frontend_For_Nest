import { useClientBHook } from "./hook";

export default function ClientB() {
  const [message, setMessage, receivedMessages, inputRef, sendMessageToA] =
    useClientBHook();

  return (
    <div className="client-b-container">
      <h1 className="heading">Client-B</h1>

      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={sendMessageToA}>
          Send
        </button>
      </div>

      <div className="messages-section">
        <h3>Messages from Client A:</h3>
        <div className="messages-list">
          {receivedMessages.map((msg, idx) => (
            <div className="message-bubble" key={idx}>
              {msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
