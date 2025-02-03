import { useState } from 'react';
import { customFetch } from '@/lib/customFetch';

export const useJournals = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllJournals = async (tabId) => {
        setLoading(true);
        try {
            const response = await customFetch(`/journals${tabId ? `?tabId=${tabId}` : ''}`, {
                method: 'GET'
            });
            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createJournal = async (data) => {
        setLoading(true);
        try {
            const response = await customFetch('/journals', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateJournal = async (id, data) => {
        setLoading(true);
        try {
            const response = await customFetch(`/journals/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteJournal = async (id) => {
        setLoading(true);
        try {
            const response = await customFetch(`/journals/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getAllJournals,
        createJournal,
        updateJournal,
        deleteJournal
    };
}; 