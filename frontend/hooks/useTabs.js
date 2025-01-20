'use client';

import { useState } from 'react';
import { customFetch } from '@/lib/customFetch';

export function useGetAllTabs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllTabs = async () => {
    setLoading(true);
    try {
      const response = await customFetch('/tabs', { method: 'GET' });
      const result = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error);
      }

      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getAllTabs };
}

export function useGetTabById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTabById = async (tabId) => {
    setLoading(true);
    try {
      const response = await customFetch(`/tabs/${tabId}`, { method: 'GET' });
      const result = await response.json();
      console.log(result);

      if (result.error) {
        throw new Error(result.error);
      }

      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getTabById };
}

export function useCreateTab() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTab = async (tabData) => {
    setLoading(true);
    try {
      const response = await customFetch('/tabs', {
        method: 'POST',
        body: JSON.stringify(tabData)
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

  return { createTab, loading, error };
}

export function useUpdateTab() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTab = async (tabId, updatedData) => {
    setLoading(true);
    try {
      const response = await customFetch(`/tabs/${tabId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
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

  return { updateTab, loading, error };
}

export function useDeleteTab() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteTab = async (tabId) => {
    setLoading(true);
    try {
      const response = await customFetch(`/tabs/${tabId}`, { method: 'DELETE' });
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

  return { deleteTab, loading, error };
}
