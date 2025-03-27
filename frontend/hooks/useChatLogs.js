'use client';
import { useState } from 'react';
import { customFetch } from '@/lib/customFetch';

export function useGetChatMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getChatMessages = async (chatId) => {
    setLoading(true);
    try {
      const response = await customFetch(`/chat-logs/${chatId}`, { method: 'GET' });
      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setMessages(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      console.error('Error fetching chat messages:', err);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, getChatMessages };
}

export function useSendChatMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (chatId, content, isUser = true) => {
    setLoading(true);
    try {
      const response = await customFetch(`/chat-logs/${chatId}`, {
        method: 'POST',
        body: JSON.stringify({ content, is_user: isUser })
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (err) {
      setError(err);
      console.error('Error sending chat message:', err);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
}
