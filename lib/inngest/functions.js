import { inngest } from "./client";
import { db } from "../prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export const generateLanguageInsights = inngest.createFunction(
  { name: "Generate Language Insights" },
  { cron: "0 0 * * 0" },
  async ({ step }) => {
    const languages = await step.run("Fetch languages", async () => {
      return await db.languageInsight.findMany({
        select: { language: true },
      });
    });

    for (const { language } of languages) {
      const prompt = `Analyze the current state of the ${language} and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "nativeSpeaker": number,
            "totalSpeaker": number,
            "rank": number,
            "geoDist": ["country1", "country2"],
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 countries in the geographical distribution`;

      const res = await step.ai.wrap(
        "gemini",
        async (p) => {
          return await model.generateContent(p);
        },
        prompt
      );

      const text = res.response.candidates[0].content.parts[0].text || "";
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

      const insights = JSON.parse(cleanedText);

      await step.run(`Update ${language} insights`, async () => {
        await db.languageInsight.update({
            where: { language },
            data : {
                ...insights,
                lastUpdate : new Date(),
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
      });
    }
  }
);
