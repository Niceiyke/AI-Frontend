import React, { useState } from "react";
import AxiosInstance from '../config/AxiosConfig'




const generateResponse= async(message)=>{

  const response=await AxiosInstance.post("/api/chat",{
    message:message
  })

  console.log(response.data)

  return response



}

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage = newMessage;

    const updatedMessages = [
      ...messages,
      { text: userMessage, sender: "user" },
    ];
    setMessages(updatedMessages);
    setNewMessage("");

    try {
      const botResponse = await generateResponse(userMessage);

      const updatedMessagesWithBot = [
        ...updatedMessages,
        { text: botResponse.data, sender: "bot" },
      ];
      setMessages(updatedMessagesWithBot);
    } catch (error) {
      console.error("Error generating bot response:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="message-list space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-100 text-gray-700 self-start"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-200">
          <input
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={handleInputChange}
          />
          <button
            className="ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
