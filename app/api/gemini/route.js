import { GoogleGenerativeAI } from "@google/generative-ai";
import { initialMessage } from "@/lib/data";
import { getUser } from "@/actions/user";

let globalChatHistory = [
  {
    role: "user",
    parts: [{ text: initialMessage.content }],
  },
]; // Initialize with initial message

export async function POST(request) {
  try {
    // adding information of user to the model
    const userInfo = await getUser();
    const userContent = userInfo
      ? `The name of the user is ${userInfo.name}. The user is ${userInfo.age} years old and speaks the native language ${userInfo.nativeLang}. ${userInfo.name} want to learn ${userInfo.language}. Initially speak in ${userInfo.nativeLang} with the User`
      : "";
    globalChatHistory.push({
      role: "user",
      parts: [{text : userContent}]
    });

    const { message } = await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Add user message to global history
    globalChatHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    const chat = model.startChat({ history: globalChatHistory });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = await response.text();

    // Add AI response to global history
    globalChatHistory.push({
      role: "model",
      parts: [{ text: text }],
    });

    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
