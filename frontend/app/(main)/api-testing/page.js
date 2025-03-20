'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Import custom hooks
import { useGetJournals, useGetDailyJournals, useCreateJournal } from '@/hooks/useJournals';
import {
  useGetAllTabs,
  useGetTabById,
  useCreateTab,
  useUpdateTab,
  useDeleteTab
} from '@/hooks/useTabs';
import { useGetMoods, useCreateMood, useUpdateMood, useDeleteMood } from '@/hooks/useMoods';

export default function APITesting() {
  const [tabId, setTabId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moods, setMoods] = useState([]);
  const [moodInstanceId, setMoodInstanceId] = useState('');
  const [date, setDate] = useState('');

  /** JOURNAL HOOKS */
  const {
    data: dailyJournals,
    loading: loadingDaily,
    error: errorDaily,
    getDailyJournals
  } = useGetDailyJournals();
  const {
    data: journals,
    loading: loadingJournals,
    error: errorJournals,
    getJournals
  } = useGetJournals();
  const { createJournal, loading: creatingJournal, error: errorCreateJournal } = useCreateJournal();

  /** TAB HOOKS */
  const {
    data: allTabs,
    loading: loadingAllTabs,
    error: errorAllTabs,
    getAllTabs
  } = useGetAllTabs();
  const { data: tab, loading: loadingTab, error: errorTab, getTabById } = useGetTabById();
  const { createTab, loading: creatingTab, error: errorCreateTab } = useCreateTab();
  const { updateTab, loading: updatingTab, error: errorUpdateTab } = useUpdateTab();
  const { deleteTab, loading: deletingTab, error: errorDeleteTab } = useDeleteTab();

  /** MOOD HOOKS */
  const { data: moodEntries, loading: loadingMoods, error: errorMoods, getMoods } = useGetMoods();
  const { createMood, loading: creatingMood, error: errorCreateMood } = useCreateMood();
  const { updateMood, loading: updatingMood, error: errorUpdateMood } = useUpdateMood();
  const { deleteMood, loading: deletingMood, error: errorDeleteMood } = useDeleteMood();

  return (
    <div className="flex flex-col space-y-8 mx-8 mt-8">
      {/* Journals Section */}
      <h1 className="text-lg text-center">JOURNALS</h1>
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <Input
        placeholder="Tab ID (optional)"
        type="number"
        value={tabId}
        onChange={(e) => setTabId(e.target.value)}
      />
      <Button onClick={() => getDailyJournals()} className="bg-blue-500" disabled={loadingDaily}>
        Get Daily Journals
      </Button>
      <Button onClick={() => getJournals(tabId)} className="bg-blue-500" disabled={loadingJournals}>
        Get Journals (Tab Specific)
      </Button>
      <Button
        onClick={() => createJournal({ title, content, tabId: tabId || null })}
        className="bg-green-500"
        disabled={creatingJournal}>
        Create Journal
      </Button>

      {/* Tabs Section */}
      <h1 className="text-lg text-center">TABS</h1>
      <Input
        placeholder="Tab ID"
        type="number"
        value={tabId}
        onChange={(e) => setTabId(e.target.value)}
      />
      <Button onClick={getAllTabs} className="bg-blue-500" disabled={loadingAllTabs}>
        Get All Tabs
      </Button>
      <Button onClick={() => getTabById(tabId)} className="bg-blue-500" disabled={loadingTab}>
        Get Tab by ID
      </Button>
      <Button
        onClick={() => createTab({ name: 'New Tab', color: '#462837' })}
        className="bg-green-500"
        disabled={creatingTab}>
        Create a New Tab
      </Button>
      <Button
        onClick={() => updateTab(tabId, { name: 'Updated Tab Name', color: '#462837' })}
        className="bg-orange-500"
        disabled={updatingTab}>
        Update an Existing Tab
      </Button>
      <Button onClick={() => deleteTab(tabId)} className="bg-red-500" disabled={deletingTab}>
        Delete a Tab
      </Button>

      {/* Moods Section */}
      <h1 className="text-lg text-center">MOODS</h1>
      <Input placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
      <Button onClick={() => getMoods('/moods/today')} className="bg-blue-500" disabled={loadingMoods}>
        Get Today's Moods
      </Button>
      <Button onClick={() => getMoods(`/moods/${date}`)} className="bg-blue-500" disabled={loadingMoods}>
        Get Moods by Date
      </Button>
      <Input placeholder="Moods (comma separated and no spaces)" value={moods} onChange={(e) => setMoods(e.target.value.split(','))} />
      <Button onClick={() => createMood({ moods: moods })} className="bg-green-500" disabled={creatingMood}>
        Create Mood
      </Button>
      <Input placeholder="Mood Instance ID" value={moodInstanceId} onChange={(e) => setMoodInstanceId(e.target.value)} />
      <Button onClick={() => updateMood(moodInstanceId, { moods })} className="bg-orange-500" disabled={updatingMood}>
        Update Mood
      </Button>
      <Button onClick={() => deleteMood(moodInstanceId)} className="bg-red-500" disabled={deletingMood}>
        Delete Mood
      </Button>
    </div>
  );
}
