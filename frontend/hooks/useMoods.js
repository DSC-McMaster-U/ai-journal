'use client';
import { useState } from 'react';
import { customFetch } from '@/lib/customFetch';

export function useGetMoodTypes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMoodTypes = async () => {
    if (data && !error) return data;

    setLoading(true);
    setError(null);

    try {
      const response = await customFetch('/moods', { method: 'GET' });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setData(result.data);
      return result.data;
    } catch (err) {
      console.error('Error fetching mood types:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getMoodTypes };
}

export function useGetMoods() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastEndpoint, setLastEndpoint] = useState(null);

  const getMoods = async (endpoint) => {
    // Always ensure endpoint is defined
    if (!endpoint) {
      console.error('No endpoint provided to getMoods');
      return null;
    }

    // Don't reuse cache when changing endpoints
    if (endpoint !== lastEndpoint) {
      setData(null);
    }

    // Only return cached data if endpoint is the same and there's no error
    if (loading) return data;
    if (endpoint === lastEndpoint && data && !error) return data;

    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching moods from endpoint: ${endpoint}`);
      const response = await customFetch(endpoint, { method: 'GET' });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Format/validate the data
      const validData = Array.isArray(result.data) ? result.data : [];

      // Store and return the data
      setData(validData);
      setLastEndpoint(endpoint);
      return validData;
    } catch (err) {
      console.error(`Error fetching moods from ${endpoint}:`, err);
      setError(err);
      setData([]); // Set empty array on error to prevent undefined errors in components
      return [];
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
    setError(null);

    try {
      if (!moodData || !moodData.moods || !Array.isArray(moodData.moods) || moodData.moods.length === 0) {
        throw new Error('Invalid mood data: moods array is required');
      }

      const response = await customFetch('/moods', {
        method: 'POST',
        body: JSON.stringify({
          moods: moodData.moods,
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (err) {
      console.error('Error creating mood:', err);
      setError(err);
      return { error: err.message || 'Failed to create mood' };
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
    setError(null);

    try {
      if (!id) {
        throw new Error('No mood instance ID provided');
      }

      if (!moodData || !moodData.moods || !Array.isArray(moodData.moods) || moodData.moods.length === 0) {
        throw new Error('Invalid mood data: moods array is required');
      }

      const response = await customFetch(`/moods/${id}`, {
        method: 'PUT',
        body: JSON.stringify(moodData)
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (err) {
      console.error(`Error updating mood ${id}:`, err);
      setError(err);
      return null;
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
    setError(null);

    try {
      if (!id) {
        throw new Error('No mood instance ID provided');
      }

      const response = await customFetch(`/moods/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (err) {
      console.error(`Error deleting mood ${id}:`, err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteMood, loading, error };
}
