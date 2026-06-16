import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, HelpCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [deepThinking, setDeepThinking] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Initial welcome message from the Twin
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: "Greetings. I am Sourik's official AI Twin. Feel free to ask me anything about my work as a Google Student Ambassador, my B.Tech studies at KIIT, our national hackathon projects such as the Federated Health Risk Predictor, or operational event coordination. \n\nSelect a quick prompt below or type your inquiry!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, []);

  const quickQuestions = [
    "Tell me about your BIS Nexus 3rd place prize.",
    "What do you do as Google Student Ambassador?",
    "Show me your core coding languages.",
    "Are you available for internships?",
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorText(null);
    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, text: m.text })),
          deepThinking,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to contact proxy server");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "model",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sources: data.sources || [],
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorText(
        err.message?.includes("API_KEY") || err.message?.includes("forbidden")
          ? "My creator's GEMINI_API_KEY is missing. Please ask Sourik to configure his key inside Settings -> Secrets panels."
          : "Speaking to my Twin is currently lagging. Please verify your internet connection or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Sparkles launcher button */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-4 bg-[#C8A96E] text-[#0A0A0A] font-bold text-xs tracking-widest uppercase rounded-full shadow-[0_10px_30px_rgba(200,169,110,0.3)] hover:shadow-[0_10px_35px_rgba(200,169,110,0.5)] transition-all duration-300 flex items-center gap-2 group border border-[#C8A96E]"
        >
          <Sparkles size={16} className="text-[#0A0A0A] group-hover:rotate-12 transition-transform" />
          <span>Ask AI Twin</span>
          {/* Pulsing indicator */}
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative block" />
        </button>
      </div>

      {/* Slide-out Sidebar Chat Tray */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-[#0A0A0A] border-l border-[#C8A96E]/20 z-50 flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          >
            {/* Header top bar */}
            <div className="p-6 border-b border-[#C8A96E]/15 flex justify-between items-center bg-[#111]">
              <div className="flex items-center gap-2.5">
                <Sparkles className="text-[#C8A96E] animate-pulse" size={18} />
                <div>
                  <h3 className="font-display text-sm font-bold text-[#F2EDE4] tracking-tight">
                    Sourik's AI Twin
                    <span className="text-[10px] text-[#C8A96E] font-mono font-medium ml-1.5 uppercase tracking-wider bg-[#C8A96E]/5 px-1.5 py-0.5 border border-[#C8A96E]/15 rounded">
                      v1.0
                    </span>
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[9px] text-[#888880] uppercase tracking-wider">
                      Grounding Enabled 
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#888880] hover:text-[#F2EDE4] transition-colors rounded-lg border border-transparent hover:border-[#C8A96E]/10 bg-[#0A0A0A]/50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conversation Core panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#C8A96E] text-[#0A0A0A] font-medium"
                        : "bg-[#111] text-[#F2EDE4] border border-[#C8A96E]/10"
                    }`}
                  >
                    {/* Preserve line breaks for formatting */}
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Grounding sources citation indicators */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[#C8A96E]/10 space-y-1">
                        <span className="font-mono text-[9px] text-[#C8A96E] uppercase tracking-widest block font-bold">
                          — SOURCES
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.map((link, idx) => (
                            <a
                              key={idx}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-0.5 bg-[#000]/60 border border-[#C8A96E]/20 rounded text-[9px] font-mono text-[#C8A96E] hover:border-[#C8A96E] transition-colors"
                            >
                              Cite {idx + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-[9px] text-[#888880] mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {/* Loader bubble */}
              {loading && (
                <div className="flex flex-col items-start">
                  <div className="bg-[#111] border border-[#C8A96E]/10 p-4 rounded-xl flex items-center gap-2">
                    <RefreshCw className="animate-spin text-[#C8A96E]" size={14} />
                    <span className="text-xs text-[#888880] font-mono uppercase tracking-wider">
                      {deepThinking ? "Reasoning with high thinking..." : "Searching Google data..."}
                    </span>
                  </div>
                </div>
              )}

              {/* Error banner */}
              {errorText && (
                <div className="bg-red-950/20 border border-red-500/20 p-4 rounded-xl flex gap-2 items-start text-red-200">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
                  <p className="text-xs leading-normal font-sans font-light">{errorText}</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sub-footer controller: Deep thinking module & quick lists */}
            <div className="p-6 border-t border-[#C8A96E]/15 bg-[#111] space-y-4">
              {/* Quick Questions on start/empty */}
              {messages.length === 1 && !loading && (
                <div className="space-y-1.5">
                  <span className="font-display text-[9px] text-[#888880] uppercase tracking-[0.2em] block">
                    QUICK SUITE
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {quickQuestions.map((pt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(pt)}
                        className="text-left py-2 px-3 text-xs border border-[#C8A96E]/10 bg-[#0A0A0A]/40 text-[#888880] hover:text-[#C8A96E] hover:border-[#C8A96E]/30 rounded-lg transition-colors"
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Deep thinking slide toggle */}
              <div className="flex items-center justify-between border-b border-[#C8A96E]/10 pb-4">
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="text-[#C8A96E]" size={14} />
                  <div>
                    <span className="font-display text-[10px] tracking-widest text-[#F2EDE4] block uppercase font-bold">
                      REASONING COGNIZANCE
                    </span>
                    <span className="text-[10px] text-[#888880] block font-light">
                      Uses high-thinking models for complex queries
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deepThinking}
                    onChange={(e) => setDeepThinking(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#0A0A0A] border border-[#C8A96E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#0A0A0A] after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-[#888880] peer-checked:after:bg-[#0A0A0A] after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#C8A96E]"></div>
                </label>
              </div>

              {/* Form Input row */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={deepThinking ? "Ask a complex reasoning prompt..." : "Ask your twin question..."}
                  className="flex-1 bg-[#0A0A0A] border border-[#C8A96E]/20 focus:border-[#C8A96E]/70 rounded-lg text-sm p-3.5 text-[#F2EDE4] outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || loading}
                  className="p-3.5 bg-[#C8A96E] disabled:bg-[#888880]/20 disabled:text-[#888880] text-[#0A0A0A] rounded-lg hover:shadow-[0_0_15px_rgba(200,169,110,0.3)] transition-all shrink-0 cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
