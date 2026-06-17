import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

  try {
    // Initialize the modern client
    const ai = new GoogleGenAI({ apiKey });
    const { messages } = req.body;
    const lastUserMessage = messages[messages.length - 1]?.text || "";

    // The new SDK targets models through the ai.models property
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: lastUserMessage,
    });

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}