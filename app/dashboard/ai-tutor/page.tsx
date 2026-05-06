"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  MessageSquare, 
  ChevronRight, 
  PlayCircle, 
  Settings2, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  CheckCircle2,
  Bookmark,
  MoreHorizontal,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for the Course Content
const courseData = {
  title: "Topic 2: Socrates and the Sophists",
  description: "The focus of philosophy shifts from the cosmos to the human being — from \"what is the world made of?\" to \"how should I live?\"",
  sections: [
    {
      id: "intro",
      title: "A Man Who Looked Like a Satyr and Thought Like No One Else",
      content: [
        "Here is a puzzle worth sitting with before we begin: if you had been an ordinary Athenian citizen in 420 BCE, you would have found it genuinely difficult to explain why Socrates was different from the Sophists you'd already met.",
        "Both wandered the city asking questions. Both attracted young men hungry for intellectual excitement. Both were associated, in the popular mind, with clever argument and ideas that challenged received wisdom.",
        "In fact, the comic playwright Aristophanes wrote a play — The Clouds, performed in 423 BCE — that lampooned Socrates as a typical Sophist: he runs a place called the \"Thinkery,\" charges fees, teaches students how to make the weaker argument defeat the stronger, and generally embodies everything the conservative Athenian found alarming about the new intellectual culture.",
        "Aristophanes was wrong about almost every detail. But the fact that he could get away with the caricature — that Athenian audiences found it recognizable — tells us something important. The distinction between Socrates and the Sophists was not obvious."
      ]
    },
    {
      id: "history",
      title: "The Historical Figure and the Socratic Problem",
      content: [
        "Socrates was born around 470 BCE in Athens, the son of Sophroniscus, a stonemason. His mother, Phaenarete, was a midwife — an occupation Socrates would later claim, with characteristic irony, that he practiced in a different medium: while she delivered babies, he delivered ideas from the minds of others.",
        "He served as a hoplite soldier and by all accounts fought with extraordinary physical courage. At the battle of Potidaea and later at Delium (424 BCE), he distinguished himself not just by bravery but by the calm, composed manner he apparently maintained even under threat of death.",
        "By physical standards, Socrates was a strange specimen. He was famously described as stocky, snub-nosed, with bulging eyes and a broad face — more satyr than Athenian ideal. He went barefoot in all seasons, wore the same rough cloak, and seemed indifferent to both comfort and the social expectation.",
        "Then comes the most important fact: Socrates wrote nothing. Not a single word. Everything we know about him comes from other people, primarily three: Plato, his devoted student; Xenophon, a more practically minded figure who left memoirs of Socrates; and Aristophanes."
      ]
    }
  ]
};

const initialChat = [
  {
    id: "1",
    role: "assistant",
    content: "Welcome to Topic 2. This lesson marks the famous pivot — where philosophy turns from the heavens to the human being. Are you ready to begin exploring Socrates and the Sophists?",
    timestamp: "10:00 AM"
  }
];

export default function AITutorPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [messages, setMessages] = useState(initialChat);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMsg = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const newAiMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "That's a great observation. Socrates' distinction from the Sophists is fundamentally about his claim to ignorance. While Sophists claimed to possess knowledge and sold it, Socrates claimed to know nothing, treating wisdom as an ongoing pursuit rather than a commodity.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080C16] shadow-2xl relative">
      
      {/* 1. LEFT SIDE: Course Content (Reader) */}
      <div className={cn(
        "flex flex-col h-full transition-all duration-300 ease-in-out border-r border-white/5",
        showSidebar ? "w-full lg:w-[60%]" : "w-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0A0F1A]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-medium text-orange-400 mb-0.5">Course Reader</div>
              <h1 className="text-sm font-semibold text-slate-200">{courseData.title}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <Settings2 className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {showSidebar ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Reader Content */}
        <div className="flex-1 overflow-y-auto scroll-smooth p-6 lg:p-12 scrollbar-hide relative">
          <div className="max-w-3xl mx-auto pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {courseData.title}
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed mb-12 border-l-4 border-orange-500/50 pl-4">
                {courseData.description}
              </p>

              {courseData.sections.map((section, idx) => (
                <div key={section.id} className="mb-16 scroll-mt-24" id={section.id}>
                  <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                    <span className="text-orange-500/50 text-sm font-mono">0{idx + 1}</span>
                    {section.title}
                  </h2>
                  <div className="space-y-6">
                    {section.content.map((paragraph, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="text-lg text-slate-300 leading-relaxed group cursor-text selection:bg-orange-500/30 transition-colors"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: AI Tutor Chat */}
      <div className={cn(
        "flex flex-col h-full bg-[#030712]/50 backdrop-blur-xl absolute lg:relative right-0 top-0 bottom-0 z-20 transition-all duration-300 ease-in-out border-l border-white/5",
        showSidebar ? "w-full sm:w-[400px] lg:w-[40%] translate-x-0" : "w-[400px] translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:border-none"
      )}>
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0A0F1A]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#0A0F1A]"></div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">AI Tutor</h2>
              <p className="text-xs text-slate-400">Always active</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSidebar(false)}
            className="lg:block hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setShowSidebar(false)}
            className="lg:hidden block p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex gap-3 max-w-[90%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className="flex-shrink-0 mt-1">
                {msg.role === "assistant" ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E293B] border border-white/10 text-indigo-400">
                    <Bot className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
              
              <div className={cn(
                "flex flex-col gap-1",
                msg.role === "user" ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === "user" 
                    ? "bg-orange-500 text-white rounded-tr-sm" 
                    : "bg-[#1E293B]/80 text-slate-200 rounded-tl-sm border border-white/5"
                )}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-slate-500 px-1">{msg.timestamp}</span>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-[80%] mr-auto"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E293B] border border-white/10 text-indigo-400">
                  <Bot className="h-4 w-4" />
                </div>
              </div>
              <div className="bg-[#1E293B]/80 rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5 flex items-center gap-1.5 h-[44px]">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#0A0F1A] border-t border-white/5">
          <div className="relative flex items-end gap-2 bg-[#1E293B]/50 border border-white/10 rounded-xl p-2 focus-within:border-orange-500/50 focus-within:bg-[#1E293B] transition-colors">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask the AI Tutor anything about the text..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 resize-none outline-none max-h-32 min-h-[40px] py-2 px-2 scrollbar-hide"
              rows={1}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-orange-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
            >
              <Send className="h-4 w-4 ml-0.5" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-3 px-1">
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI can make mistakes. Verify important info.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button (When Sidebar is hidden) */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="absolute top-4 right-4 z-30 p-3 rounded-full bg-[#1E293B] border border-white/10 text-slate-300 shadow-xl hover:text-white hover:bg-[#2A3B52] transition-colors animate-fade-in"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
