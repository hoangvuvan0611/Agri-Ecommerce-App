'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
  productIds?: string[]; // Thêm field để lưu product IDs
}

interface ChatContextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
  updateMessage: (id: number, updated: Partial<Message>) => void;
  clearMessages: () => void;
}

const ChatStoreContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const updateMessage = useCallback((id: number, updated: Partial<Message>) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updated } : msg))
    );
  }, []);

  const clearMessages = useCallback(() => setMessages([]), []);

  return (
    <ChatStoreContext.Provider
      value={{ isOpen, setIsOpen, messages, setMessages, addMessage, updateMessage, clearMessages }}
    >
      {children}
    </ChatStoreContext.Provider>
  );
};

export const useChatStore = () => {
  const context = useContext(ChatStoreContext);
  if (!context) {
    throw new Error('useChatStore must be used within a ChatProvider');
  }
  return context;
};
