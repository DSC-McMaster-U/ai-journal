'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  useGetAllTabs,
  useGetTabById,
  useCreateTab,
  useUpdateTab,
  useDeleteTab
} from '@/hooks/useTabs';
import { useState } from 'react';
import { customFetch } from '@/lib/customFetch';
import { create } from 'react-test-renderer';

export default function APITesting() {
  const [tabId, setTabId] = useState(0);
  const { getAllTabs, data: allTabs, loading: loadingAll, error: errorAll } = useGetAllTabs();
  const { getTabById, data: tab, loading: loadingTab, error: errorTab } = useGetTabById();
  const { createTab, loading: creating, error: errorCreate } = useCreateTab();
  const { updateTab, loading: updating, error: errorUpdate } = useUpdateTab();
  const { deleteTab, loading: deleting, error: errorDelete } = useDeleteTab();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [moodId, setMoodId] = useState(0);
  const [userMoodId, setUserMoodId] = useState(0);
  // get all moods
  const getAllMoods = async () => {
    setLoading(true);
    try {
      const response = await customFetch('/moods', { method: 'GET' });
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
  // create mood
  const createMood = async (mood) => {
    setLoading(true);
    try {
      const response = await customFetch('/moods', {
        method: 'POST',
        body: JSON.stringify(mood)
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
  // update mood
  const updateMood = async (userMoodId, moodId) => {
    setLoading(true);
    try {
      const response = await customFetch(`/moods/${userMoodId}`, {
        method: 'PUT',
        body: JSON.stringify(moodId)
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
  // delete mood
  const deleteMood = async (userMoodId) => {
    setLoading(true);
    try {
      const response = await customFetch(`/moods/${userMoodId}`, { method: 'DELETE' });
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

  return (
    <div>
      {/* Testing api for tabs */}
      <div className="flex flex-col space-y-4 mx-8 mt-8">
        <h1 className="text-lg text-center">TABS</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="tabId" className="basis-20">
            Tab ID
          </label>
          <Input
            id="tabId"
            type="number"
            value={tabId}
            onChange={(e) => setTabId(e.target.value)}
          />
        </div>
        <Button onClick={getAllTabs} className="bg-blue-500" disabled={loadingAll}>
          Get All Tabs
        </Button>
        <Button
          onClick={() => {
            getTabById(tabId);
          }}
          className="bg-blue-500"
          disabled={loadingTab}>
          Get Tab by ID
        </Button>
        <Button
          onClick={() => createTab({ name: 'New Tab', color: '#462837' })}
          className="bg-green-500"
          disabled={creating}>
          Create a New Tab
        </Button>
        <Button
          onClick={() => updateTab(tabId, { name: 'Updated Tab Name', color: '#462837' })}
          className="bg-orange-500"
          disabled={updating}>
          Update an Existing Tab
        </Button>
        <Button
          onClick={() => {
            deleteTab(tabId);
          }}
          className="bg-red-500"
          disabled={deleting}>
          Delete a Tab
        </Button>
      </div>
      {/* Testing api for moods */}
      <div className="flex flex-col space-y-4 mx-8 mt-8">
        <h1 className="text-lg text-center">MOODS</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="userMoodId" className="basis-20">
            User Mood ID
          </label>
          <Input
            id="userMoodID"
            type="number"
            value={userMoodId}
            onChange={(e) => setUserMoodId(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="moodId" className="basis-20">
            Mood ID
          </label>
          <Input
            id="moodID"
            type="number"
            value={moodId}
            onChange={(e) => setMoodId(e.target.value)}
          />
        </div>
        <Button onClick={getAllMoods} className="bg-blue-500" disabled={loading}>
          Get All Moods
        </Button>
        <Button
          onClick={() => createMood({ moodId: moodId, name: 'New Mood' })}
          className="bg-green-500"
          disabled={loading}>
          Create a New Mood
        </Button>
        <Button
          onClick={() => updateMood(userMoodId, { moodId: moodId })}
          className="bg-orange-500"
          disabled={loading}>
          Update an Existing Mood
        </Button>
        <Button
          onClick={() => {
            deleteMood(userMoodId);
          }}
          className="bg-red-500"
          disabled={loading}>
          Delete a Mood
        </Button>
      </div>
    </div>
  );
}
