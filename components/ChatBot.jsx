// --- Chatbot.jsx ---
"use client";
import { useRef, useState, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, sessionId }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const aiMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    setIsLoading(false);
    setError("Request stopped.");
  };

  const handleRetry = () => {
    const lastUserMessage = messages.filter((msg) => msg.role === "user").pop();
    if (lastUserMessage) {
      setInput(lastUserMessage.content);
      setMessages(messages.slice(0, -1));
      handleSubmit();
    }
  };

  useEffect(() => {
    const savedSessionId = localStorage.getItem("sessionId");
    const currentSessionId = savedSessionId || uuidv4();
    setSessionId(currentSessionId);
    localStorage.setItem("sessionId", currentSessionId);

    const loadChat = async () => {
      try {
        const res = await fetch(`/api/load-chat?sessionId=${currentSessionId}`);
        const data = await res.json();
        if (data.messages) {
          const reversed = [...data.messages].reverse().map((msg) => ({
            role: msg.role === "bot" ? "assistant" : msg.role,
            content: msg.message,
          }));
          setMessages(reversed);
        }
      } catch (err) {
        console.error("Failed to load chat:", err);
      }
    };

    loadChat();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-2xl h-[80vh] flex flex-col bg-white rounded-lg shadow-lg overflow-auto">
      <div className="bg-black p-4 text-white text-lg font-semibold">
        Chat with Mr. Lingo
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.length === 0 && <div>No Messages Yet</div>}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.role === "user"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-900"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="w-full items-center flex justify-center gap-3">
            <Loader2 className="animate-spin h-2 w-5 text-primary" />
            <button className="underline" onClick={handleStop}>
              Stop
            </button>
          </div>
        )}
        {error && (
          <div className="w-full items-center flex justify-center gap-3">
            <div>An Error Occurred: {error}</div>
            <button className="underline" onClick={handleRetry}>
              Retry
            </button>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700"
          disabled={isLoading}
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}
