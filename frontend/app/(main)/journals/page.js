'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import JournalTabs from '@/components/journals/JournalTabs';
import EntryCard from '@/components/journals/EntryCard';
import { useGetTabById } from '@/hooks/useTabs';
import { useJournals } from '@/hooks/useJournals';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function JournalsPage({ defaultTab = 'daily' }) {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [entries, setEntries] = useState([]);
  const pathName = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const { getTabById, data: tab } = useGetTabById();
  const { getAllJournals, createJournal, loading, error } = useJournals();

  const currentPathJournalId = pathName.split('/').pop();

  useEffect(() => {
    getTabById(currentPathJournalId);
  }, [currentTab]);

  useEffect(() => {
    setCurrentTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    fetchJournals();
  }, [currentTab]);

  const fetchJournals = async () => {
    try {
      const result = await getAllJournals(currentTab);
      setEntries(result.data || []);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch journal entries',
        variant: 'destructive'
      });
    }
  };

  const handleCreateJournal = async () => {
    try {
      const newJournal = await createJournal({
        title: 'Untitled Entry',
        content: '',
        tabId: currentTab !== 'daily' ? currentTab : undefined
      });

      router.push(`/journals/${currentTab}/${newJournal.data.id}`);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create new journal entry',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="p-4 text-2xl capitalize border-b-[6px]">{tab && tab.data.name}</h1>

      <div className="flex-1 overflow-y-auto">
        <div>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                currentTab={currentTab}
                onDelete={fetchJournals}
              />
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
