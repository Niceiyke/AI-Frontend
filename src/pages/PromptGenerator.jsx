import React, { useState } from "react";
import axios from "axios";
import TextOutputCard from "../components/TextOutputCard";
import Navbar from "../components/Navbar";
import { BaseUrl } from "../CONSANT.JSX";
import AxiosInstance from "../config/AxiosConfig";


function PromptGenerator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    

    try {
      const response = await AxiosInstance.post(`/api/prompt_generator`, {
        detail: inputText,
      });

      if (response.status === 200) {
        setOutputText(response.data);
      } else {
        setError("An error occurred while generating the prompt.");
      }
    } catch (error) {
      setError("An error occurred while communicating with the server.");
    }

    finally{setLoading(false);}
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 font-sans">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Prompt Generator
        </h1>
        <textarea
          className="p-2 border border-gray-300 rounded-md w-full max-w-md h-32 resize-none mb-4 leading-snug text-base"
          placeholder="Enter a prompt description..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50 w-full max-w-xs text-base font-semibold tracking-wider"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate"}
        </button>
        {error && (
          <p className="mt-2 text-red-600 text-center text-base">{error}</p>
        )}
        <div className="mt-4 w-full max-w-md">
          {outputText && (
            <TextOutputCard output={outputText} title={"Generated Prompt"} />
          )}
        </div>
      </div>
    </>
  );
}

export default PromptGenerator;
