'use client';
import { useState } from 'react';
import { customFetch } from '@/lib/customFetch';

export function useGetMoods() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMoods = async (endpoint) => {
    setLoading(true);
    try {
      const response = await customFetch(endpoint, { method: 'GET' });
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

  return { data, loading, error, getMoods };
}

export function useCreateMood() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMood = async (moodData) => {
    setLoading(true);
    try {
      const response = await customFetch('/moods', {
        method: 'POST',
        body: JSON.stringify(moodData),
      });

      const result = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createMood, loading, error };
}

export function useUpdateMood() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMood = async (id, moodData) => {
    setLoading(true);
    try {
      const response = await customFetch(`/moods/${id}`, {
        method: 'PUT',
        body: JSON.stringify(moodData),
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

  return { updateMood, loading, error };
}

export function useDeleteMood() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMood = async (id) => {
    setLoading(true);
    try {
      const response = await customFetch(`/moods/${id}`, {
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
    } finally {
      setLoading(false);
    }
  };

  return { deleteMood, loading, error };
}