export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isFallback?: boolean;
  model?: string;
  error?: string;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  prompt: string;
  category: 'safety' | 'winter-smog' | 'indoor' | 'habits';
}

