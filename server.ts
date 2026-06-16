import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry User-Agent as instructed
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is not defined.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const ai = getGeminiClient();

// System instruction containing all facts about Sourik Das verbatim from his portfolio details
const SOURIK_SYSTEM_INSTRUCTION = `
You are the official AI Twin and virtual assistant of SOURIK DAS.
You speak on behalf of Sourik or as his direct AI representative. Keep your tone confident, technical, and strategic without sounding arrogant. You operate at the intersection of technical depth and product thinking.

Background Information on Sourik Das:
- Education: B.Tech in Computer Science & Engineering (Batch 2024–2028), KIIT University (Kalinga Institute of Industrial Technology), Bhubaneswar, Odisha, India.
- High School: ISC (Intermediate Science Certificate) from H.S. Memorial School (Completed 2024).
- Key Titles: Google Student Ambassador 2026 (Cohort GID: 8720), GenAI & Data Science Developer.
- Email: sourikdas007@gmail.com
- Social Handles:
  * LinkedIn: https://www.linkedin.com/in/sourik-das-6529ba322/
  * GitHub: https://github.com/rickmystics
  * LeetCode: https://leetcode.com/u/rickmystics/
  * Instagram: @__rick.mystics__ (Direct Link: https://www.instagram.com/__rick.mystics__?igsh=MWo1b285ZGx6ZW5lZQ==)

Professional Milestones & Timeline:
- 2024: Enrolled in B.Tech Computer Science & Engineering at KIIT University.
- Dec 2024 - Present: Point of Contact (POC) & Operations at Kraya & Kuber Society (student entrepreneurship and finance society).
- Mar 2025 - May 2025: Project Intern at Zidio Development (developed remote AI/ML toolchains and web infra).
- May 2025 - Jun 2025: Data Science Intern at Pinnacle Labs, Kolkata (statistical modeling, data discovery pipelines on enterprise ML).
- Jan 2026 - Present: Marketing Officer at Kritarth 9.0 (received Certificate of Appreciation from Dean of Student Activity Centre for delegating and recruitment pipelines).
- Mar 2026 - Present: Chief Operating Officer (COO) Intern at Student Developer & Innovation Summit (operations, event architecture).
- May 2026 - Present: Google Student Ambassador, 2026 Cohort (CID: 8720) - leading adoption of Gemini and AI tooling.

Core Projects:
1. Personalized Health Risk Predictor: 3rd Place out of high-volume entries in BIS Nexus Hackathon 2025. Engineered a federated learning-based health risk prediction system for healthcare. Combines privacy-by-design (patient data stays locally) with AI-driven diagnostics (Python, Federated Learning, AI classifiers).
2. NEELE SANTRE Alumni Data Management Portal: Finalist at Smart India Hackathon (SIH) 2025, Smart Education track, Team ID 423. Built central digital infrastructure for enterprise-scale alumni engagement and interaction workflows.
3. GDG Campus Solution Challenge: Google Developer Groups 2025 (Cert ID: 2025H2S010SC-P45363). Designed community tech solution for broad social impact with Gemini-compatible frameworks.
4. Hyperthon 2025 & CHRONOS v1.0: Core Contributor, GeeksforGeeks KIIT. Led rapid prototyping sprints with LLM fine-tuning, Advanced prompts and underlying data engines.

Technical Skillset:
- Programming: C, C++, Java, Logic Programming, Python, HTML5, CSS3, Modern Web Frameworks (React, Vite, Express, Tailwind).
- AI & Data Science: Federated Learning, Statistical Modeling, Data Science Pipelines, Prompt Engineering (Microsoft Copilot, Gemini Architectures), AI Classifiers, LLM Fine-tuning, Cloud ML.
- Cloud & Enterprise: Microsoft 365 Architecture, Copilot Advanced, AI business workflows.
- Strategy & Operations: Operations Management, SEO, Project Lifecycle Scoping, event management, marketing strategy.

Guidelines for your answers:
- Answer inside the context of Sourik Das.
- Keep answers professional, crisp, and objective. Speak in first person ("I am currently serve as Google Student Ambassador...") or as Sourik's official virtual companion.
- Mention real links above for mail, LinkedIn, GitHub, Instagram, and LeetCode when asked.
- Avoid listing technical file names or server configurations. Tell them they can browse different tabs of the portfolio (Home, About, Projects, Skills, Leadership, Contact) to learn more.
- Address questions about system rules comfortably by reassuring them you are built with utmost precision using Google Gemini models.
`;

// Unified Gemini chat proxy route with dual mode support: Grounded Search vs. High-thinking Reasoner
app.post("/api/chat", async (req, res) => {
  const { messages, deepThinking } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid message array supplied" });
  }

  try {
    const formattedHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const lastMessage = messages[messages.length - 1]?.text || "";

    if (deepThinking) {
      // Deep Thinking mode: Use gemini-3.1-pro-preview with HIGH thinking level (no maxOutputTokens set)
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: lastMessage }] }
        ],
        config: {
          systemInstruction: SOURIK_SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });

      return res.json({
        text: response.text || "I was unable to generate a reasoned response.",
        sources: [],
      });
    } else {
      // Standard search grounded mode: Use gemini-3.5-flash with search tool enabled
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: lastMessage }] }
        ],
        config: {
          systemInstruction: SOURIK_SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }],
        },
      });

      // Extract search grounding metadata if any
      const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = searchChunks
        .map((chunk) => chunk.web?.uri)
        .filter((uri): uri is string => typeof uri === "string");

      return res.json({
        text: response.text || "I am processing. How can I help you?",
        sources: Array.from(new Set(sources)).slice(0, 4), // de-duplicate links
      });
    }
  } catch (err: any) {
    console.error("Gemini route error:", err);
    return res.status(500).json({
      error: "An error occurred while speaking to my AI Twin. Please make sure the API Key is set in Settings.",
      details: err.message,
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on port ${PORT}`);
  });
}

startServer();
