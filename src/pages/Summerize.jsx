import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TextOutputCard from "../components/TextOutputCard";
import axios from "axios";
import { BaseUrl } from "../CONSANT.JSX";
import AxiosInstance from "../config/AxiosConfig";


function SummarizePage() {
  const [inputText, setInputText] = useState("");
  const [summarizedText, setSummarizedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSummarize = async () => {
    if (!inputText) {
      setError("Please enter a YouTube URL before summarizing.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Validate YouTube URL format
    if (!isValidYouTubeURL(inputText)) {
      setError("Please enter a valid YouTube URL.");
      setIsLoading(false);
      return;
    }

 

    const requestData = {
      youtube_url: inputText,
    };

    try {
      const response = await AxiosInstance.post('/api/ytsummerize',requestData);

      if (response.status == 200) {
        setSummarizedText(response.data);
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError("An error occurred while communicating with the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearInput = () => {
    setInputText("");
    setSummarizedText("");
    setError(null);
  };

  const isValidYouTubeURL = (url) => {
    const youtubeURLPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/(watch\?v=[\w-]+|embed\/[\w-]+|v\/[\w-]+|channels\/(?:[\w-]+\/)?[\w-]+|user\/[\w-]+|playlist\?list=[\w-]+)/;  
return youtubeURLPattern.test(url);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Summarize Any YouTube Video
          </h1>
          <input
            type="text"
            placeholder="Enter YouTube URL"
            value={inputText}
            onChange={handleInputChange}
            className="w-full border py-2 px-4 rounded-md mb-2"
          />
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
              onClick={handleSummarize}
              disabled={isLoading}
            >
              {isLoading ? "Summarizing..." : "Summarize"}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md w-full"
              onClick={clearInput}
            >
              Clear
            </button>
          </div>
          {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
        </div>
        {summarizedText && (
          <div className="mt-4">
            <TextOutputCard title={"Summarized Text"} output={summarizedText} />
          </div>
        )}
      </div>
    </>
  );
}

export default SummarizePage;
