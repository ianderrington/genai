'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ToolRegistry } from '@supernal/interface/browser';
import { getBlogAIInterface } from '@/lib/BlogAIInterface';
import { ToolManager } from '@/lib/ToolManager';
import { useRouter } from 'next/navigation';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

const STORAGE_KEY = 'supernal-chat-messages';
const MAX_MESSAGES = 100;

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
        }));
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
    return [
      {
        role: 'assistant' as const,
        content: 'Hi! I can help you navigate and interact with this blog. Try asking me to go to blog or search for posts.',
        timestamp: new Date(),
      },
    ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Save messages to localStorage
  useEffect(() => {
    try {
      const toSave = messages.slice(-MAX_MESSAGES).map((m) => ({
        ...m,
        timestamp: m.timestamp?.toISOString(),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  }, [messages]);

  // Initialize AI interface with router
  useEffect(() => {
    const ai = getBlogAIInterface();
    ai.setRouter(router);
  }, [router]);

  // Subscribe to tool execution results
  useEffect(() => {
    const unsubscribe = ToolManager.subscribe((result) => {
      // Add tool execution feedback to chat
      const emoji = result.success ? '✅' : '❌';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `${emoji} ${result.message}`,
          timestamp: new Date(),
        },
      ]);
    });

    return unsubscribe;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Check if we should use AI or fuzzy matching
      const useRealAI = process.env.NEXT_PUBLIC_USE_REAL_AI === 'true';

      if (useRealAI) {
        // Use real Claude API
        const tools = Array.from(ToolRegistry.getAllTools().values()).map((tool) => ({
          name: tool.methodName,
          description: tool.description || `Execute ${tool.methodName}`,
          parameters: tool.inputSchema || {},
        }));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
            tools,
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.message,
            timestamp: new Date(),
          },
        ]);
      } else {
        // Use fuzzy matching (no API calls)
        const ai = getBlogAIInterface();
        const result = await ai.executeCommand(content);

        // Response is handled by ToolManager subscription above
        // Just add confirmation message
        if (!result.success) {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: result.message,
              timestamp: new Date(),
            },
          ]);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hi! I can help you navigate and interact with this blog. Try asking me to go to blog or search for posts.',
        timestamp: new Date(),
      },
    ]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
