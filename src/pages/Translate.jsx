// TranslatePage.js
import React, { useState } from "react";
import Select from "react-select";
import Navbar from "../components/Navbar";
import axios from "axios";
import AxiosInstance from "../config/AxiosConfig";




function TranslatePage() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLanguage, setFromLanguage] = useState(null);
  const [toLanguage, setToLanguage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    // Add more language options
  ];

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTranslate = async () => {
    if (!inputText || !fromLanguage || !toLanguage) {
      setError("Please enter text and select both languages.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call for translation
    try {
      const response = await AxiosInstance.post('/api/translate', {
        from_language: fromLanguage.value,
        to_language: toLanguage.value,
        message: inputText,
      });
    
      if (response.status == 200) {
        setTranslatedText(response.data);
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold mb-4">Translate Page</h1>
        <div className="w-full max-w-md mx-auto rounded flex flex-col items-center">
          <div className="max-w-md mx-auto mb-4">
            <Select
              options={languageOptions}
              value={fromLanguage}
              onChange={(selectedOption) => setFromLanguage(selectedOption)}
              placeholder="Translate from"
              className="w-full"
            />
          </div>
          <div className="max-w-md mx-auto mb-4">
            <Select
              options={languageOptions}
              value={toLanguage}
              onChange={(selectedOption) => setToLanguage(selectedOption)}
              placeholder="Translate to"
              className="w-full"
            />
          </div>
          <div className="w-full max-w-md mx-auto rounded">
            <textarea
              className="w-full max-w-md mx-auto p-2 border rounded mb-2"
              rows="6"
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={handleInputChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              onClick={handleTranslate}
              disabled={isLoading}
            >
              {isLoading ? "Translating..." : "Translate"}
            </button>
            {error && <p className="mt-2 text-red-600">{error}</p>}
            {translatedText && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Translated Text:</h2>
                <p>{translatedText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TranslatePage;
