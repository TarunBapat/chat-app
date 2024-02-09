import React, { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useState } from "react";
export default function Chat({ socket, user, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        author: user,
        room: room,
        message: currentMessage,
        date:
          new Date(Date.now()).getHours() +
          " : " +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
    }
    setCurrentMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prev) => {
        return [...prev, data];
      });
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">Live Chat</div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          <div>
            {messageList.map((message) => {
              return (
                <div
                  className="message"
                  id={user === message.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{message.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="author">{message.author}</p>
                      <p id="time">{message.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
