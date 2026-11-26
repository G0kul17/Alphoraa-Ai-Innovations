import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MessageSquare, Minus, X, Send, ArrowRight } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';
import { useSmoothScroll } from '../../context/SmoothScrollContext';
import { EASE_SETTLE } from '../../animations/variants';
import { AgentIcon } from '../common/AgentIcon';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ChatAction {
  label: string;
  to: string;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  actions?: ChatAction[];
}

const WELCOME_TEXT =
  "Hello! Welcome to ALPHORAA AI INNOVATIONS.\n\nI'm your AI assistant. I can help you explore our services, discover our solutions, learn about our products or connect with our team.\n\nHow can I assist you today?";

const QUICK_ACTIONS: ChatAction[] = [
  { label: 'Explore AI Services', to: '/services' },
  { label: 'Discover Our Products', to: '/products' },
  { label: 'Request a Project Quote', to: '/contact' },
  { label: 'Talk to Our Team', to: '/contact' },
];

function getTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getScriptedResponse(input: string): { text: string; actions?: ChatAction[] } {
  const q = input.toLowerCase();

  if (q.includes('service') || q.includes('agentic') || q.includes('automation') || q.includes('build')) {
    return {
      text: 'We offer 8 core capabilities including Agentic AI Development, AI & Machine Learning Solutions, AI Automation, Custom Software, Web & App Development, Enterprise AI, Conversational AI, and Cloud Solutions.',
      actions: [
        { label: 'View All Services', to: '/services' },
        { label: 'Agentic AI Details', to: '/services/agentic-ai-development' },
      ],
    };
  }

  if (q.includes('product') || q.includes('demo') || q.includes('console') || q.includes('studio')) {
    return {
      text: 'Our Products showcase features three conceptual demo platforms: AI Agent Console, Workflow Automation Studio, and Insights Dashboard. Real product specifications will be supplied.',
      actions: [{ label: 'Explore Demo Products', to: '/products' }],
    };
  }

  if (q.includes('quote') || q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('budget')) {
    return {
      text: 'Project scopes vary by architecture and integration depth. You can share your requirements and budget range through our Contact enquiry form to start a discovery conversation.',
      actions: [{ label: 'Request a Project Quote', to: '/contact' }],
    };
  }

  if (q.includes('team') || q.includes('contact') || q.includes('talk') || q.includes('email') || q.includes('call')) {
    return {
      text: 'You can reach our team via the interactive Contact page, where you can select a specific service and submit your project brief.',
      actions: [{ label: 'Go to Contact Page', to: '/contact' }],
    };
  }

  if (q.includes('industr') || q.includes('solution') || q.includes('health') || q.includes('finance') || q.includes('retail')) {
    return {
      text: 'We outline potential AI applications across 8 industries: Healthcare, Finance & Banking, Manufacturing, Retail & E-commerce, Education, Real Estate, Logistics, and Enterprise Operations.',
      actions: [{ label: 'Explore Industry Solutions', to: '/solutions' }],
    };
  }

  if (q.includes('about') || q.includes('who') || q.includes('company') || q.includes('mission')) {
    return {
      text: 'ALPHORAA AI INNOVATIONS focuses on building practical, reliable AI systems, autonomous agents, and intelligent automation tailored for modern businesses.',
      actions: [{ label: 'About ALPHORAA', to: '/about' }],
    };
  }

  return {
    text: 'I am a scripted demo assistant, so I can best guide you using our site sections. Choose one of the topics below or ask about services, industries, products, or contacting our team.',
    actions: [
      { label: 'Explore Services', to: '/services' },
      { label: 'Contact Team', to: '/contact' },
    ],
  };
}

export function Chatbot() {
  const { isOpen, closeChat, pendingPrompt, clearPendingPrompt } = useChatbot();
  const { setLocked } = useSmoothScroll();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setLocked(isOpen);
    return () => setLocked(false);
  }, [isOpen, setLocked]);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text: WELCOME_TEXT,
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const sendUserMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: getTimestamp(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      const reply = getScriptedResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: reply.text,
          timestamp: getTimestamp(),
          actions: reply.actions,
        },
      ]);
      setIsTyping(false);
    }, 550);
  };

  useEffect(() => {
    if (isOpen && pendingPrompt) {
      sendUserMessage(pendingPrompt);
      clearPendingPrompt();
    }
  }, [isOpen, pendingPrompt, clearPendingPrompt]);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  // Escape & basic focus trap when open
  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeChat();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeChat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendUserMessage(input);
  };

  const handleActionNavigate = (to: string) => {
    navigate(to);
    closeChat();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.24, ease: EASE_SETTLE }}
          role="dialog"
          aria-modal="true"
          aria-label="ALPHORAA AI Assistant"
          className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-24 z-50 w-full sm:w-[390px] h-[88dvh] sm:h-[560px] bg-[#0A0A0A] sm:rounded-2xl rounded-t-3xl shadow-[0_24px_60px_-15px_rgba(18,59,96,0.3)] border border-white/10 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="gradient-brand-surface text-white px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#F36B21]/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(243,107,33,0.35)]">
                <AgentIcon className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold truncate">
                  ALPHORAA AI Assistant
                </p>
                <p className="text-[11px] text-[#EAF4FB]/80 truncate">
                  Demo assistant: scripted responses
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={closeChat}
                aria-label="Minimize assistant"
                className="w-9 h-9 rounded-lg hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Close assistant"
                className="w-9 h-9 rounded-lg hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-black"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE_SETTLE }}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#1769AA] text-white rounded-br-sm'
                      : 'bg-[#0A0A0A] text-white border border-white/10 shadow-xs rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.actions.map((act) => (
                        <button
                          key={act.to}
                          type="button"
                          onClick={() => handleActionNavigate(act.to)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#141414] text-[#EAF4FB] hover:bg-[#1769AA] hover:text-white transition-colors cursor-pointer"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="mt-1 text-[10px] text-[#9CA3AF] px-1">
                  {msg.timestamp}
                </span>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex items-start">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] animate-bounce motion-reduce:animate-pulse [animation-delay:-0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] animate-bounce motion-reduce:animate-pulse [animation-delay:-0.1s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] animate-bounce motion-reduce:animate-pulse" />
                </div>
              </div>
            )}
            <div ref={scrollEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2.5 bg-[#0A0A0A] border-t border-white/5 flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => handleActionNavigate(action.to)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#141414]/80 text-[#EAF4FB] hover:bg-[#1769AA] hover:text-white transition-colors cursor-pointer"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#0A0A0A] border-t border-white/10 flex items-center gap-2 shrink-0"
          >
            <label htmlFor="chatbot-input" className="sr-only">
              Ask the demo assistant
            </label>
            <input
              ref={inputRef}
              id="chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, products, or contact..."
              className="flex-1 min-w-0 px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-black text-white placeholder:text-[#9CA3AF] focus:border-[#1769AA] focus:bg-[#141414] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="w-11 h-11 rounded-xl gradient-accent-cta text-white flex items-center justify-center shrink-0 disabled:opacity-50 hover:brightness-105 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
