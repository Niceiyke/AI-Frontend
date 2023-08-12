// Routes.js
import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import App from "./App"; // The main App component
import SummarizePage from "./pages/Summerize";
import TranslatePage from "./pages/Translate";
import BusinessNameGeneratorPage from "./pages/BusinessName";
import PromptGenerator from "./pages/PromptGenerator";
import SQLGenerator from "./pages/SQLGenerator";

function General_Routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/summerize" element={<SummarizePage />} />
        <Route path="/translate" element={<TranslatePage />} />
        <Route
          path="/business-name-generator"
          element={<BusinessNameGeneratorPage />}
        />
        <Route path="/prompt-generator" element={<PromptGenerator />} />
        <Route path="/sql-generator" element={<SQLGenerator/>} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default General_Routes;
