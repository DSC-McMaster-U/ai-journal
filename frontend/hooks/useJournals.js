'use client';

import { useState } from 'react';
import { customFetch } from '@/lib/customFetch';

export function useGetDailyJournals() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDailyJournals = async () => {
    setLoading(true);
    try {
      const response = await customFetch('/journals', { method: 'GET' });
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

  return { data, loading, error, getDailyJournals };
}

export function useGetJournals() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getJournals = async (tabId = null) => {
    setLoading(true);
    try {
      const url = tabId ? `/journals?tabId=${tabId}` : '/journals';
      const response = await customFetch(url, { method: 'GET' });
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

  return { data, loading, error, getJournals };
}

export function useGetJournalById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getJournalById = async (id) => {
    setLoading(true);
    try {
      const response = await customFetch(`/journals/${id}`, { method: 'GET' });
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

  return { data, loading, error, getJournalById };
}

export function useCreateJournal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createJournal = async ({ title, content, tabId = null }) => {
    setLoading(true);
    try {
      const body = JSON.stringify(tabId ? { title, content, tabId } : { title, content });

      const response = await customFetch('/journals', {
        method: 'POST',
        body,
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

  return { createJournal, loading, error };
}
