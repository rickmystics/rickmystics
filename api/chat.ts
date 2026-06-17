import { GoogleGenAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  // Only allow POST requests from your chat window
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Securely reads the key from your Vercel Project Dashboard settings
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const { messages } = req.body;
    
    // Safely extract the very last text chunk the user submitted
    const lastUserMessage = messages[messages.length - 1]?.text || "";

    // Target the lightweight and rapid gemini-1.5-flash engine
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(lastUserMessage);
    const responseText = result.response.text();

    // Return the response data directly to your frontend UI array
    return res.status(200).json({ text: responseText });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}