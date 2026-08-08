const axios = require("axios");

const generateMarketAnalysis = async (startupData) => {
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
You are an expert startup market analyst.

Analyze the potential market for the following startup.

Startup Name:
${startupName}

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

Your task is to provide a realistic market analysis.

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not add any explanation outside the JSON.

Use exactly this structure:

{
  "marketOverview": "A clear overview of the market relevant to this startup.",
  "targetMarket": "Detailed description of the primary target customers and market segment.",
  "customerNeeds": [
    "Customer need 1",
    "Customer need 2",
    "Customer need 3"
  ],
  "marketTrends": [
    "Market trend 1",
    "Market trend 2",
    "Market trend 3"
  ],
  "marketOpportunities": [
    "Opportunity 1",
    "Opportunity 2",
    "Opportunity 3"
  ],
  "marketRisks": [
    "Market risk 1",
    "Market risk 2",
    "Market risk 3"
  ],
  "marketGrowth": "Qualitative assessment of the expected market growth.",
  "customerDemand": "Assessment of the likely customer demand.",
  "marketAttractiveness": 75,
  "recommendation": "Overall market recommendation for the founder.",
  "confidence": 85
}

Requirements:

- Be realistic and analytical.
- Base the analysis on the provided startup information.
- Do not invent exact market statistics.
- Do not claim specific market sizes unless they are provided in the startup information.
- Use qualitative assessments when exact data is unavailable.
- customerNeeds must contain exactly 3 items.
- marketTrends must contain exactly 3 items.
- marketOpportunities must contain exactly 3 items.
- marketRisks must contain exactly 3 items.
- marketAttractiveness must be a number from 0 to 100.
- confidence must be a number from 0 to 100.
- Consider the target country and target audience.
- Consider the startup's budget and team size when evaluating feasibility.
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

    if (!text) {
      throw new Error(
        "OpenRouter returned an empty response"
      );
    }

    // Remove markdown code fences if AI adds them
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error(
        "OpenRouter returned invalid Market Analysis JSON:"
      );

      console.error(text);

      throw new Error(
        "AI returned invalid Market Analysis JSON"
      );
    }

    return parsedResponse;

  } catch (error) {
    console.error(
      "OpenRouter Market Analysis Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.error?.message ||
      error.message ||
      "Failed to generate market analysis"
    );
  }
};

module.exports = {
  generateMarketAnalysis,
};