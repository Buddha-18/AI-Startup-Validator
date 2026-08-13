const axios = require("axios");

const generateCompetitorAnalysis = async (startupData) => {
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
You are an expert startup competitive intelligence analyst.

Analyze the competitive landscape for the following startup.

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

Your task is to identify the most relevant competitors and explain how this startup can compete against them.

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not add any explanation outside the JSON.

Use exactly this structure:

{
  "competitors": [
    {
      "name": "Competitor 1",
      "description": "Brief description of what this competitor does.",
      "strengths": [
        "Strength 1",
        "Strength 2"
      ],
      "weaknesses": [
        "Weakness 1",
        "Weakness 2"
      ],
      "ourAdvantage": "How the startup can differentiate itself from this competitor."
    },
    {
      "name": "Competitor 2",
      "description": "Brief description of what this competitor does.",
      "strengths": [
        "Strength 1",
        "Strength 2"
      ],
      "weaknesses": [
        "Weakness 1",
        "Weakness 2"
      ],
      "ourAdvantage": "How the startup can differentiate itself from this competitor."
    },
    {
      "name": "Competitor 3",
      "description": "Brief description of what this competitor does.",
      "strengths": [
        "Strength 1",
        "Strength 2"
      ],
      "weaknesses": [
        "Weakness 1",
        "Weakness 2"
      ],
      "ourAdvantage": "How the startup can differentiate itself from this competitor."
    }
  ],
  "startupPosition": {
    "name": "${startupName}",
    "strengths": [
      "Startup strength 1",
      "Startup strength 2"
    ],
    "weaknesses": [
      "Startup weakness 1",
      "Startup weakness 2"
    ],
    "ourAdvantage": "The startup's overall competitive advantage."
  },
  "competitiveIntensity": "Low, Moderate, or High",
  "competitiveOpportunity": "Overall assessment of the opportunity for this startup to compete successfully.",
  "recommendation": "Overall competitive recommendation for the founder.",
  "confidence": 85
}

Requirements:

- Identify exactly 3 relevant competitors.
- Prefer competitors that actually operate in the target country or target market.
- Consider both direct and indirect competitors.
- Do not invent fictional companies.
- Do not invent exact financial figures or market-share percentages.
- Do not claim specific statistics unless they are provided in the startup information.
- competitor names must be realistic and relevant to the startup's industry and target market.
- Each competitor must have exactly 2 strengths.
- Each competitor must have exactly 2 weaknesses.
- startupPosition.strengths must contain exactly 2 items.
- startupPosition.weaknesses must contain exactly 2 items.
- competitiveIntensity must be one of:
  "Low",
  "Moderate",
  "High"
- confidence must be a number from 0 to 100.
- Consider the target country.
- Consider the target audience.
- Consider the startup's budget.
- Consider the startup's team size.
- Focus on practical competitive positioning rather than generic statements.
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
        "OpenRouter returned invalid Competitor Analysis JSON:"
      );

      console.error(text);

      throw new Error(
        "AI returned invalid Competitor Analysis JSON"
      );
    }

    return parsedResponse;

  } catch (error) {
    console.error(
      "OpenRouter Competitor Analysis Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "Failed to generate competitor analysis"
    );
  }
};

module.exports = {
  generateCompetitorAnalysis,
};