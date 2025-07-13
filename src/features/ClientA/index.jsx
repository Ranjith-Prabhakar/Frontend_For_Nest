import { useClientAHook } from "./hook";

export default function ClientA() {
  const [message, setMessage, receivedMessages, inputRef, sendMessageToB] =
    useClientAHook();

  return (
    <div className="client-b-container">
      <h1 className="heading">Client-A</h1>

      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={sendMessageToB}>
          Send
        </button>
      </div>

      <div className="messages-section">
        <h3>Messages from Client B:</h3>
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
