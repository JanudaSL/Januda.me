"use client";
import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle, Trash2, Sparkles, ArrowUp } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hey there! 👋 I'm Januda's AI assistant. Ask me anything about work, skills, or projects!",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  // Play alert sound and show notification after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Play sound
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
      // Show notification animation
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { 
      role: "user", 
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.content }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      if (data.error) {
        setMessages((m) => [...m, { 
          role: "assistant", 
          content: `⚠️ ${data.error}`,
          timestamp: new Date()
        }]);
      } else {
        setMessages((m) => [...m, { 
          role: "assistant", 
          content: data.answer,
          timestamp: new Date()
        }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((m) => [...m, { 
        role: "assistant", 
        content: "❌ Something went wrong. Please try again!",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        role: "assistant", 
        content: "Hey there! 👋 I'm Januda's AI assistant. Ask me anything about work, skills, or projects!",
        timestamp: new Date()
      },
    ]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Floating Button
  if (!isOpen) {
    return (
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className={`group relative w-16 h-16 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center ${showNotification ? 'animate-ring' : ''}`}
          style={{
            backgroundImage: "url('/jk2.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          aria-label="Open chat"
        >
          {/* Hidden audio element - FIXED: moved inside button */}
          <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/03/24/audio_4020e1bbf3.mp3" className="hidden" />
          
          <div className="absolute inset-0 bg-black/20 rounded-full group-hover:bg-black/10 transition-all"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          
          {/* Notification badge */}
          {showNotification && (
            <div className="absolute -top-14 -right-4 bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black text-xs font-semibold px-4 py-2 rounded-2xl shadow-xl animate-slideIn min-w-[280px] max-w-[320px] border-2 border-gray-300">
              <div className="relative">
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0 animate-wave">👋</span>
                  <p className="leading-relaxed text-black">
                    <span className="font-bold text-black">Hey there!</span><br/>
                    Ask me about Januda&apos;s skills, projects & experience!
                  </p>
                </div>
                {/* Speech bubble tail */}
                <div className="absolute -bottom-4 right-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-gray-200"></div>
              </div>
            </div>
          )}
          
          {/* Ring effect */}
          {showNotification && (
            <>
              <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-75"></div>
              <div className="absolute inset-0 rounded-full bg-purple-400 animate-pulse"></div>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-6 bottom-6 w-[420px] max-w-[calc(100vw-3rem)] z-50">
      <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border border-gray-200">
        
        {/* Header with Image Background */}
        <div 
          className="relative px-6 py-4"
          style={{
            backgroundImage: "url('/cht.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/cht1.png" 
                  alt="Januda"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30 shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Ask Januda</h3>
                <p className="text-white/80 text-xs">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <Trash2 className="text-white" size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="text-white" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white space-y-4 scroll-smooth"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn gap-2`}
            >
              <div className={`flex gap-2 max-w-xs ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                {m.role === "user" ? (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                    Y
                  </div>
                ) : (
                  <img 
                    src="/cht1.png" 
                    alt="Januda"
                    className="flex-shrink-0 w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-sm font-bold text-white';
                      fallback.textContent = 'J';
                      e.target.parentNode.appendChild(fallback);
                    }}
                  />
                )}
                
                {/* Message Container */}
                <div className="flex flex-col gap-1">
                  <div
                    className={`px-4 py-2.5 rounded-2xl ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                        : "bg-gray-100 text-gray-900 shadow-sm border border-gray-200"
                    }`}
                  >
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      m.role === "user" ? "text-white" : "text-gray-900"
                    }`}>
                      {m.content}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 px-4">
                    {formatTime(m.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading Animation */}
          {loading && (
            <div className="flex justify-start animate-fadeIn gap-2">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                J
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your message... (Shift+Enter for new line)"
                disabled={loading}
                className="w-full resize-none px-4 py-2.5 rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none text-sm text-gray-900 placeholder-gray-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 bg-white"
                style={{ minHeight: "44px", maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 flex items-center justify-center group disabled:hover:shadow-none"
              aria-label="Send message"
            >
              <ArrowUp size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {["Skills", "Projects", "Education", "Contact"].map((topic) => (
              <button
                key={topic}
                onClick={() => setInput(`Tell me about Januda's ${topic.toLowerCase()}`)}
                disabled={loading}
                className="px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-full whitespace-nowrap transition-colors disabled:opacity-50"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes ring {
          0%, 100% {
            transform: rotate(0deg);
          }
          10%, 30% {
            transform: rotate(-10deg);
          }
          20%, 40% {
            transform: rotate(10deg);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-20deg);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-ring {
          animation: ring 0.5s ease-in-out infinite;
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        .animate-wave {
          animation: wave 0.6s ease-in-out infinite;
          display: inline-block;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}