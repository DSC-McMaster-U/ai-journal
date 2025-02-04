'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import JournalTabs from '@/components/journals/JournalTabs';
import EntryCard from '@/components/journals/EntryCard';
import { useGetTabById } from '@/hooks/useTabs';
import {
  useCreateJournal,
  useGetDailyJournals,
  useGetJournals,
  useJournals
} from '@/hooks/useJournals';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function JournalsPage({ defaultTab = '' }) {
  const pathName = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [entries, setEntries] = useState([]);

  const { getTabById, loading: loadingTab, data: tab } = useGetTabById();

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

  useEffect(() => {
    getTabById(currentTab);
    fetchJournals();
  }, [currentTab]);

  // useEffect(() => {
  //   setCurrentTab(defaultTab);
  // }, [defaultTab]);

  const fetchJournals = async () => {
    try {
      if (currentTab === '') {
        const res = await getDailyJournals();
        setEntries(res);
      } else {
        const res = await getJournals(currentTab);
        setEntries(res);
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch journal entries'
      });
    }
  };

  const handleCreateJournal = async () => {
    try {
      const newJournal = await createJournal({
        title: 'Untitled Entry',
        content: '',
        tabId: currentTab !== '' ? currentTab : null
      });

      // router.push(`/journals/${currentTab}/${newJournal.id}`);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create new journal entry',
        variant: 'destructive'
      });
    }
  };

  if (loadingDaily || loadingJournals || loadingTab) {
    return <LoadingSpinner />;
  }

  console.log('entries', entries);

  return (
    <div className="flex flex-col">
      <h1 className="p-4 text-2xl capitalize border-b-[6px]">
        {currentTab === '' ? 'Daily Journals' : tab && tab.data.name}
      </h1>

      <div className="flex-1 overflow-y-auto">
        <div>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry.id} className="p-4 border-b-[1px]">
                <h2 className="text-lg">{entry.title}</h2>
                <p>{entry.content}</p>
              </div>
              // <EntryCard
              //   key={entry.id}
              //   entry={entry}
              //   currentTab={currentTab}
              //   onDelete={fetchJournals}
              // />
            ))
          ) : (
            <div className="text-center p-8">No entries in this journal yet.</div>
          )}
        </div>
      </div>

      <JournalTabs />
      <Button
        onClick={handleCreateJournal}
        size="icon"
        className="rounded-full p-6 fixed right-[20px] bottom-[100px] z-[5] transition-all hover:-translate-y-[2px]">
        <Plus className="!w-6 !h-6" strokeWidth={3} />
      </Button>
    </div>
  );
}
