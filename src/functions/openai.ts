import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getKeywords(text: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "From the block of text, extract and a list of keywords from it.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1,
    });

    console.log({ data: response });
    let inputString = response.choices[0]?.message?.content || "";
    // Input string

    // Remove the surrounding double quotes
    inputString = inputString.replace(/^"|"$/g, "");

    // Split the string into an array based on newline character or comma
    var itemList = inputString.split(/\n|,/);

    // Trim each item to remove leading and trailing whitespaces
    itemList = itemList.map((item) => item.trim());

    // Output the list
    console.log({ itemList });

    return itemList;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchResearchPapers(query: string) {
  const endpoint = `https://api.semanticscholar.org/graph/v1/paper/search`;

  try {
    const response = await axios.get(endpoint, {
      params: {
        query: query,
        fields: "url,abstract,authors,tldr,title,openAccessPdf,isOpenAccess",
      },
      headers: {
        "x-api-key": process.env.REACT_APP_SEMANTIC_SCHOLAR_API_KEY || "",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching research papers:", error);
    return null;
  }
}

export { getKeywords, fetchResearchPapers };
