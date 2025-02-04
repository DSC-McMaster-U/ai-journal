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
import Modal from '@/components/common/Modal';
import { DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function JournalsPage({ currentTab = '' }) {
  const { toast } = useToast();

  const [journalName, setJournalName] = useState('Untitled Journal');
  const [journalTabSelected, setJournalTabSelected] = useState(currentTab);
  const [entries, setEntries] = useState([]);

  const { getTabById, loading: loadingTab, data: tab } = useGetTabById();

  const { loading: loadingDaily, getDailyJournals } = useGetDailyJournals();
  const { loading: loadingJournals, getJournals } = useGetJournals();
  const {
    createJournal,
    loading: loadingCreatingJournal,
    error: errorCreateJournal
  } = useCreateJournal();

  useEffect(() => {
    getTabById(currentTab);
    fetchJournals();
  }, [currentTab]);

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
        title: journalName,
        content: '',
        tabId: journalTabSelected
      });

      router.push(`/journals/entries/${newJournal.id}`);
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
            entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
          ) : (
            <div className="text-center p-8">No entries in this journal yet.</div>
          )}
        </div>
      </div>

      <JournalTabs />
      <Modal
        title={'Create a New Journal Entry'}
        trigger={
          <Button
            size="icon"
            className="rounded-full p-6 fixed right-[20px] bottom-[100px] z-[5] transition-all hover:-translate-y-[2px]">
            <Plus className="!w-6 !h-6" strokeWidth={3} />
          </Button>
        }>
        <div>
          <Label htmlFor="journal-name" className="text-right">
            Journal Name
          </Label>
          <Input
            value={journalName}
            onChange={(e) => setJournalName(e.target.value)}
            id="journal-name"
            placeholder="Enter journal name"
            className="col-span-3"
          />
        </div>
        <div className="flex gap-2 mt-6">
          <DialogClose className="flex-1" asChild>
            <Button onClick={handleCreateJournal}>Create Journal</Button>
          </DialogClose>
          <DialogClose className="flex-1" asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </div>
      </Modal>
    </div>
  );
}
