import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getKeywords(text: string) {
  try {
    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "From the block of text, extract and a list of keywords from it.",
    //     },
    //     {
    //       role: "user",
    //       content: text,
    //     },
    //   ],
    //   temperature: 0.5,
    //   max_tokens: 64,
    //   top_p: 1,
    // });

    // console.log({ data: response });
    // const content = response.choices[0]?.message?.content;
    // const keywords = content?.split("\n").map((keyword) => keyword.trim());
    // const items = content?.replace(/-/g, " ").split("\n");

    // // Join the items with commas
    // const queryString = items?.join(", ") ?? "";

    const exampleKeywords =
      "  recent,   research papers,   applications,   artificial intelligence,   healthcare    ";
    console.log({ exampleKeywords });
  } catch (error) {
    console.error(error);
  }
}
export { getKeywords };
