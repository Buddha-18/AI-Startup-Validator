const axios = require("axios");

const generateExecutiveSummary = async (startupData) => {
  const {
    startupName,
    idea,
    industry,
    country,
    audience,
    budget,
    teamSize,
  } = startupData;

  const prompt = `
You are an expert startup analyst.

Analyze this startup idea and create a professional executive summary.

Startup Name: ${startupName}

Startup Idea:
${idea}

Industry:
${industry}

Target Country:
${country}

Target Audience:
${audience}

Estimated Budget:
${budget}

Team Size:
${teamSize}

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not add any explanation outside the JSON.

Use exactly this structure:

{
  "title": "Short executive summary title",
  "summary": "A concise but detailed executive summary.",
  "problem": "The main problem the startup is solving.",
  "solution": "How the proposed solution addresses the problem.",
  "targetMarket": "Description of the target market and customers.",
  "businessModel": "Likely business model and revenue approach.",
  "keyStrengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "keyChallenges": [
    "Challenge 1",
    "Challenge 2",
    "Challenge 3"
  ],
  "recommendation": "Overall recommendation for the founder.",
  "confidence": 85
}

Requirements:

- Be realistic rather than overly positive.
- Base the analysis on the provided information.
- Do not invent specific market statistics.
- Make the analysis useful for a startup founder.
- confidence must be a number from 0 to 100.
- keyStrengths must contain exactly 3 items.
- keyChallenges must contain exactly 3 items.
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text =
      response.data?.choices?.[0]?.message?.content;

      console.log(
  "OpenRouter Model Used:",
  response.data?.model
);

console.log(
  "OpenRouter Response:",
  response.data
);

    if (!text) {
      throw new Error(
        "OpenRouter returned an empty response"
      );
    }

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error(
        "OpenRouter returned invalid JSON:"
      );

      console.error(text);

      throw new Error(
        "AI returned invalid JSON"
      );
    }

    return parsedResponse;

  } catch (error) {
    console.error(
      "OpenRouter API Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.error?.message ||
      error.message ||
      "Failed to generate AI analysis"
    );
  }
};

module.exports = {
  generateExecutiveSummary,
};