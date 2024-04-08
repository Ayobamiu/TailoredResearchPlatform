import React, { useState } from "react";
import { fetchResearchPapers, getKeywords } from "../functions/openai";
import Paper from "../data/dataType";

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestPrompts, setSuggestPrompts] = useState<string[]>([
    "Summarize the book 'Deep Learning' by Ian Goodfellow et al.",
    "Find recent research papers on the applications of artificial intelligence in healthcare.",
    "Show me articles discussing climate change mitigation strategies published in the last year.",
    "What are the key concepts discussed in the paper 'Attention is All You Need' by Vaswani et al.?",
  ]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const exampleResponse = data.data;
  // console.log({ exampleResponse: exampleResponse });
  console.log({ keywords });

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

  console.log({ data });

  return (
    <div className="App">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const keywordsArray = await getKeywords(searchTerm);
          setKeywords(keywordsArray);
          await fetchResearchPapers(keywordsArray.toString())
            .then((data) => {
              console.log({ data }); // Handle the retrieved data here
              setData(data.data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          setLoading(false);
        }}
      >
        <h1>Search Page</h1>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search research papers by title, authors, date and keywords..."
          list="suggestionsList"
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
        <datalist id="suggestionsList">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion}>
              {suggestion}
            </option>
          ))}
        </datalist>
      </form>

      {loading && <div className="loader"></div>}

      {!data.length && (
        <div>
          {/* Display list of suggestion prompts */}
          <h5>Suggest Prompts:</h5>
          <div>
            {suggestPrompts.map((i, index) => (
              <li
                key={index}
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setSearchTerm(i)}
              >
                <u>{i}</u>
              </li>
            ))}
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div>
          {/* Display list of text items */}
          <h3>Results for "{searchTerm}":</h3>
          <div className="">
            Keywords:{" "}
            {keywords.map((i, index) => (
              <small key={index}>
                <u>{i}</u>
                {index < keywords.length - 1 && ","}
                &nbsp;
              </small>
            ))}{" "}
          </div>
          <ul>
            {/* Simulated list of text items */}
            {data.map((i: Paper, index) => (
              <li key={index}>
                <a href={i.url} target="_blank">
                  <h4>
                    <u>{i.title}</u>
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                      <g
                        stroke-width="2.1"
                        stroke="#666"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="17 13.5 17 19.5 5 19.5 5 7.5 11 7.5"></polyline>
                        <path d="M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5"></path>
                      </g>
                    </svg>
                  </h4>
                </a>
                <p>{i.tldr.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
