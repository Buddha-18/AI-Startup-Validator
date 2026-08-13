const axios = require("axios");

const generateSWOTAnalysis = async (startup) => {
  try {
    const prompt = `
You are an expert startup strategist and business analyst.

Analyze the following startup and generate a professional SWOT Analysis.

STARTUP INFORMATION:
Startup Name: ${startup.startupName}
Idea: ${startup.idea}
Industry: ${startup.industry}
Country: ${startup.country}
Target Audience: ${startup.audience}
Budget: ${startup.budget}
Team Size: ${startup.teamSize}

Generate a realistic and startup-specific SWOT analysis.

Return ONLY valid JSON in exactly this structure:

{
  "strengths": [
    {
      "title": "Short title",
      "description": "In short"
    }
  ],
  "weaknesses": [
    {
      "title": "Short title",
      "description": "In short"
    }
  ],
  "opportunities": [
    {
      "title": "Short title",
      "description": "In short"
    }
  ],
  "threats": [
    {
      "title": "Short title",
      "description": "In short"
    }
  ]
}

Requirements:
- Provide 2-3 points for each category.
- Make every point specific to this startup.
- Do not give generic business advice.
- Consider the startup's industry, country, target audience, budget, and team size.
- Strengths and weaknesses must focus on internal factors.
- Opportunities and threats must focus on external factors.
- Keep descriptions practical and understandable.
- Do not include Markdown.
- Do not include explanations outside the JSON.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen3-235b-a22b-2507",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let content = response.data.choices[0].message.content;

    // Remove markdown code fences if the model adds them
    content = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const swot = JSON.parse(content);

    return swot;
  } catch (error) {
    console.error(
      "SWOT Analysis Service Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to generate SWOT analysis");
  }
};

module.exports = {
  generateSWOTAnalysis,
};