import React, { useState } from "react";
import axios from "axios";
import TextOutputCard from "../components/TextOutputCard";
import Navbar from "../components/Navbar";
import { BaseUrl } from "../CONSANT.JSX";
import AxiosInstance from "../config/AxiosConfig";

function SQLGenerator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);


    try {
      const response = await AxiosInstance.post(
        `/api/sql_generator`,
        {
          detail: inputText,
        }
      );
      if (response.status == 200) {
        setOutputText(response.data);
        console.log("response", response.data);
      } else {
        console.log("error occure");
      }
    } catch (error) {
      console.error("API Call Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">SQL Generator</h1>
        <textarea
          className="p-2 border border-gray-300 rounded-md w-2/6 h-32 resize-none"
          placeholder="Enter what you want your prompt to do. ..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate"}
        </button>
        <div className="mt-4">
          {outputText && (
            <TextOutputCard output={outputText} title={"Generated SQL"} />
          )}
        </div>
      </div>
    </>
  );
}

export default SQLGenerator;
