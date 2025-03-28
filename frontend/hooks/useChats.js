'use client';
import { useState } from 'react';
import { customFetch } from '@/lib/customFetch';

export function useGetChats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getChats = async () => {
    setLoading(true);
    try {
      const response = await customFetch('/chats', { method: 'GET' });
      const result = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error);
      }

      setData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getChatsWithLastMessage = async () => {
    setLoading(true);

    try {
      const response = await customFetch('/chats/withlastmessage', { method: 'GET' });
      const result = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error);
      }

      setData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getChats, getChatsWithLastMessage };
}

export function useCreateChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createChat = async ({ chatName = null }) => {
    setLoading(true);
    try {
      const response = await customFetch('/chats', {
        method: 'POST',
        body: JSON.stringify({ chatName }),
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createChat, loading, error };
}

export function useUpdateChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateChat = async ({ instanceId, chatName, favourited }) => {
    setLoading(true);
    try {
      const response = await customFetch(`/chats/${instanceId}`, {
        method: 'PUT',
        body: JSON.stringify({ chatName, favourited }),
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateChat, loading, error };
}

export function useDeleteChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteChat = async (instanceId) => {
    setLoading(true);
    try {
      const response = await customFetch(`/chats/${instanceId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteChat, loading, error };
}
