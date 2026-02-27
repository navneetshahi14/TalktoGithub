"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  owner: string;
  repo: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ owner, repo }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: `This repository (${owner}/${repo}) follows a modular structure. You asked: "${userMessage.content}"`,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-900">
        <h2 className="text-white font-semibold">
          Chat with {owner}/{repo}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                msg.role === "user"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-400 px-4 py-2 rounded-2xl text-sm animate-pulse">
              AI is typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-slate-800 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something about this repository..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
