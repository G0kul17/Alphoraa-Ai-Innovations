import React, { createContext, useContext, useState, useCallback } from 'react';

interface ChatbotContextValue {
  isOpen: boolean;
  openChat: (initialPrompt?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  pendingPrompt: string | null;
  clearPendingPrompt: () => void;
}

const ChatbotContext = createContext<ChatbotContextValue | undefined>(undefined);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const openChat = useCallback((initialPrompt?: string) => {
    if (initialPrompt) {
      setPendingPrompt(initialPrompt);
    }
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const clearPendingPrompt = useCallback(() => {
    setPendingPrompt(null);
  }, []);

  return (
    <ChatbotContext.Provider
      value={{ isOpen, openChat, closeChat, toggleChat, pendingPrompt, clearPendingPrompt }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot(): ChatbotContextValue {
  const ctx = useContext(ChatbotContext);
  if (!ctx) {
    throw new Error('useChatbot must be used within ChatbotProvider');
  }
  return ctx;
}
