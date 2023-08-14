import React, { useState, useRef, useEffect } from "react";
import AxiosInstance from "../config/AxiosConfig";
import { Configuration, OpenAIApi,ChatCompletionRequestMessage } from "openai";



const generateResponse = async (messages) => {
  const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const response=openai.createChatCompletion({
  model:"gpt-3.5-turbo",messages:messages
})
  

  return response;
};

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatWindowRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to the bottom of the chat window when new messages arrive
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const humanMessage = {
      role: "user",
      content: newMessage,
    };

    setMessages((current) => [
      ...current,
      humanMessage,
    ]);
    setNewMessage('')

    setIsTyping(true);

    try {
      

      const userMessage =[...messages, humanMessage]
        

      const botResponse = await generateResponse(userMessage);


      setMessages((current)=>[...current,botResponse.data.choices[0].message])

      setIsTyping(false);
    } catch (error) {
      console.error("Error generating bot response:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow p-4">
        <div
          ref={chatWindowRef}
          className="max-h-[400px] overflow-y-auto space-y-2"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-wrapper ${
                message.role === "assistant" ? "self-start" : "self-end"
              }`}
            >
              <div
                className={`message px-4 py-2 ${
                  message.role === "assistant"
                    ? "bg-gray-100 border-8 text-gray-700"
                    : "bg-green-800  border-8 text-white text-end "
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message px-4 py-2 bg-gray-100 text-gray-700 self-start">
              Bot is typing...
            </div>
          )}
        </div>
      </div>
      <div className="p-4 bg-gray-200">
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
          disabled={isTyping}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatApp;
