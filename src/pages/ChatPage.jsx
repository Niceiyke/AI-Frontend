import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaBars } from "react-icons/fa";
import { Configuration, OpenAIApi } from "openai";

const generateResponse = async (messages) => {
  // ... (your existing generateResponse function)
    const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  return response.data.choices[0].message.content;
};

function ChatApp() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // New state for sidebar

  const chatWindowRef = useRef(null);

  useEffect(() => {
    const storedConversations = localStorage.getItem("chatConversations");
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatConversations", JSON.stringify(conversations));
  }, [conversations]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleStartNewConversation = () => {
    const newConversation = {
      id: uuidv4(),
      messages: [],
    };
    setConversations([...conversations, newConversation]);
    setActiveConversation(newConversation.id);
  };

  const handleSetActiveConversation = (conversationId) => {
    setActiveConversation(conversationId);
    setSidebarOpen(false)
  };

  const handleDeleteConversation = (conversationId) => {
    const updatedConversations = conversations.filter(
      (conversation) => conversation.id !== conversationId
    );
    setConversations(updatedConversations);
    setActiveConversation(null);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !activeConversation) return;

    const humanMessage = {
      role: "user",
      content: newMessage,
    };

    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === activeConversation) {
        conversation.messages.push(humanMessage);
      }
      return conversation;
    });

    setConversations(updatedConversations);
    setNewMessage("");
    setIsTyping(true);

    try {
      const activeConversationObj = conversations.find(
        (conversation) => conversation.id === activeConversation
      );
      const botResponse = await generateResponse(
        activeConversationObj.messages
      );

      const botMessage = {
        role: "assistant",
        content: botResponse,
      };

      const updatedConversationsWithBot = updatedConversations.map(
        (conversation) => {
          if (conversation.id === activeConversation) {
            conversation.messages.push(botMessage);
          }
          return conversation;
        }
      );

      setConversations(updatedConversationsWithBot);
      setIsTyping(false);
    } catch (error) {
      console.error("Error generating bot response:", error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100">
      <button
        className="lg:hidden bg-gray-200 p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars />
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md "
        onClick={handleStartNewConversation}
      >
        Start New Conversation
      </button>
      <div className="flex-grow lg:p-12">
        <div className="block lg:flex">
          {/* Button to toggle the sidebar */}

          {/* Sidebar dropdown */}
          <div
            className={`lg:w-1/4 bg-gray-100 p-4 space-y-4 first-line: ${
              sidebarOpen ? "" : "hidden lg:block"
            }`}
          >
            {conversations.map((conversation) => (
              <div key={conversation.id} className="flex">
                <div
                  className={`cursor-pointer p-2 rounded-md ${
                    conversation.id === activeConversation
                      ? "bg-blue-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSetActiveConversation(conversation.id)}
                >
                  Conversation {conversation.id}
                </div>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => handleDeleteConversation(conversation.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {/* ... (rest of your code) */}
          <div className="flex-grow p-4 lg:p-32">
            {activeConversation && (
              <div ref={chatWindowRef} className="">
                {conversations
                  .find(
                    (conversation) => conversation.id === activeConversation
                  )
                  .messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message-wrapper ${
                        message.role === "assistant" ? "" : ""
                      }`}
                    >
                      <div
                        className={`message px-2 py-2 ${
                          message.role === "assistant"
                            ? "bg-gray-100 border-2 rounded-md mb-2  mr-20 lg:mr-96 text-gray-700"
                            : "bg-green-800  border-2 rounded-md mb-2 ml-20 lg:ml-96 text-white   "
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
            )}
          </div>
        </div>
      </div>
      {activeConversation && (
        <div className="flex justify-between  p-4 lg:p-12 ">
          <input
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="ml-2 px-4 py-2 rounded-lg bg-green-800 text-white focus:outline-none focus:ring focus:border-green-600"
            onClick={handleSendMessage}
            disabled={isTyping}
          >
            {!isTyping ? "Send" : "Replying"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatApp;

