"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

export const generateAIInsights = async (language) => {
    const prompt = `Analyze the current state of the ${language} and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "nativeSpeaker": number,
            "totalSpeaker": number,
            "rank": number,
            "geoDist": ["country1", "country2"],
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 countries in the geographical distribution`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
};


export async function getLanguageInsights() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Fetch user along with languageInsight
    const user = await db.user.findUnique({
      where: { clerkUserid: userId },
      include: { languageInsights: true }, // Ensure we include it here
    });

    if (!user) throw new Error("User not found");

    // Check if the language insight already exists
    let languageInsight = user.languageInsights;

    if (!languageInsight) {
      const insight = await generateAIInsights(user.language);

      languageInsight = await db.languageInsight.create({
        data: {
          language: user.language,
          ...insight,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next update in a week
        },
      });

      console.log("New Language Insight Created:", languageInsight);
    }

    return languageInsight;
  } catch (error) {
    console.error("Error fetching language insights:", error);
    return null;
  }
}
