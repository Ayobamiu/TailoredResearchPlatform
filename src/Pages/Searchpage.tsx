import React, { useState } from "react";
import { getKeywords } from "../functions/openai";
// import {} from openai

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // console.log({
  //   REACT_APP_OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY,
  // });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Simulated data for autocomplete suggestions
    const suggestions = [
      "Artificial Intelligence",
      "Machine Learning",
      "Healthcare",
      "Data Science",
    ].filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(suggestions);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getKeywords(searchTerm);
        }}
      >
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          list="suggestionsList"
        />
        <button>Search</button>
        <datalist id="suggestionsList">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion}>
              {suggestion}
            </option>
          ))}
        </datalist>
      </form>

      <div>
        {/* Display list of text items */}
        <h5>Results for "{searchTerm}":</h5>
        <ul>
          {/* Simulated list of text items */}
          <li>Result 1</li>
          <li>Result 2</li>
          <li>Result 3</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
