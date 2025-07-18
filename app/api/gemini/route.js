import { GoogleGenerativeAI } from "@google/generative-ai";
import { getUser } from "@/actions/user";
import { db } from "@/lib/prisma";
import { initialMessage } from "@/lib/data";


export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, sessionId } = body;

    if (!prompt || !sessionId) {
      return new Response("Bad Request: Missing prompt or sessionId", {
        status: 400,
      });
    }

    const user = await getUser();
    if (!user) return new Response("User not found", { status: 401 });

    const previousMessages = await db.conversation.findMany({
      where: { userId: user.id, sessionId },
      orderBy: { createdAt: "asc" },
    });

    const isFirstMessage = previousMessages.length === 0;

    let history = [
  {
    role: "user",
    parts: [{ text: initialMessage.content }],
  },
]; // Initialize with initial message

    // 1. If first message, add initial prompt about user info
    console.log(isFirstMessage, previousMessages.length);
    
    if (isFirstMessage) {
      const userInfo = user
        ? `The name of the user is ${user.name}. The user is ${user.age} years old and speaks the native language ${user.nativeLang}. ${user.name} wants to learn ${user.language}. Initially, speak in ${user.nativeLang} with the user.`
        : "";
      if (userInfo) {
        history.push({
          role: "user",
          parts: [{ text: userInfo }],
        });
      }

      // Add initial system message
      history.push({
        role: "user",
        parts: [{ text: initialMessage.content }],
      });
    }

    // 2. Add recent conversation (last 5)
    const recentMessages = previousMessages.slice(-5);
    for (const msg of recentMessages) {
      history.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.message }],
      });
    }

    // 3. Push current user message
    history.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({ history });

    const result = await chat.sendMessage(prompt);
    const responseText = result.response.text().trim();

    console.log(responseText);
    

    // Save user message
    await db.conversation.create({
      data: {
        userId: user.id,
        message: prompt,
        role: "user",
        sessionId,
      },
    });

    // Save AI message
    await db.conversation.create({
      data: {
        userId: user.id,
        message: responseText,
        role: "bot",
        sessionId,
      },
    });

    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
