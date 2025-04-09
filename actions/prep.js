"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateQuestions() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserid: userId },
      select: {
        language: true,
        nativeLang: true,
      },
    });

    if (!user) throw new Error("user not found");

    const prompt = `
    Generate 10 questions for the language ${user.language} to test how well the user has learnt the language.
    The Question should be preferably in ${user.nativeLang} and the Options might be in English or in ${user.language} 
    Each question should be multiple choice with 4 options.
    The level of the questions should be easy in the beginning and harder as the questions proceed
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const assessment = JSON.parse(cleanedText);

    return assessment.questions;
  } catch (error) {
    console.error("Error generating assessment questions: ", error);
    throw new Error("Failed to generate assessment questions");
  }
}

export async function saveQuestions(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserid: userId },
    select: {
      id: true,
      language: true,
    },
  });

  //console.log(user);
  
  if (!user) throw new Error("user not found");


  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question : "${q.question}"\nCorrect ANswer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.language} practice questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);

      improvementTip = tipResult.response.text().trim();
      //console.log(improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
    }
  }

  //console.log(questionResults);
  

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        score,
        questions: questionResults,
        language: user.language,
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    throw new Error("Failed to save questions");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserid: userId },
    select: {
      id: true,
      language: true,
    },
  });
  console.log(user.id);
  
  if (!user) throw new Error("user not found");
  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    console.log(assessments);
    
    return assessments;
  } catch (error) {
    throw new Error("Failed to get assessments");
  }
}

export async function countAssessments() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserid: userId },
    select: {
      id: true, // Crucial: We need the user's ID to filter assessments
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const assessmentCount = await db.assessment.count({
      where: {
        userId: user.id,
      },
    });

    return assessmentCount;
  } catch (error) {
    console.error("Failed to count assessments:", error); // Log the error
    throw new Error("Failed to count assessments");
  }
}
