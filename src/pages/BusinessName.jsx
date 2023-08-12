import React, { useState } from "react";
import axios from "axios";
import ListCard from "../components/ListCard";
import Navbar from "../components/Navbar";
import { BaseUrl } from "../CONSANT.JSX";
import AxiosInstance from "../config/AxiosConfig";


function BusinessNameGeneratorPage() {
  const [businessDetails, setBusinessDetails] = useState({
    keyword: "",
    industry: "",
  });
  const [generatedNames, setGeneratedNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusinessDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const generateBusinessNames = async () => {
    if (!businessDetails.keyword || !businessDetails.industry) {
      setError("Please provide a keyword and an industry.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.post('/api/business_name_generator', {
        keyword: [businessDetails.keyword],
        industry: businessDetails.industry,
      });

      if (response.status === 200) {
        setGeneratedNames(response.data);
      } else {
        setError("An error occurred while generating the prompt.");
      }
    } catch (error) {
      setError("An error occurred while generating names.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Business Name Generator
        </h1>
        <div className="max-w-md mx-auto mt-8">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Keyword:</label>
            <input
              type="text"
              name="keyword"
              value={businessDetails.keyword}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Industry:</label>
            <input
              type="text"
              name="industry"
              value={businessDetails.industry}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            onClick={generateBusinessNames}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Names"}
          </button>
          {error && <p className="mt-2 text-red-600">{error}</p>}
          {generatedNames?.length > 0 && (
            <div className="mt-4">
              <ul>
                <ListCard list={generatedNames} title={"Generated Names"} />
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BusinessNameGeneratorPage;
