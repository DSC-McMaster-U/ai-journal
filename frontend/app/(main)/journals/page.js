'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import JournalTabs from '@/components/journals/JournalTabs';
import EntryCard from '@/components/journals/EntryCard';
import { JOURNAL_ENTRIES } from '@/lib/constants';

export default function JournalsPage({ defaultTab = 'daily' }) {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [tabs, setTabs] = useState([
    { id: 'daily', name: 'Daily Journal', color: '#FF0000' },
    { id: 'gratitude', name: 'Gratitude Journal', color: '#00FF00' },
    { id: 'dreams', name: 'Dream Journal', color: '#0000FF' }
  ]);
  const pathName = usePathname();

  const currentPathJournalId = pathName.split('/').pop();

  useEffect(() => {
    setCurrentTab(defaultTab);
  }, [defaultTab]);

  const filteredEntries = JOURNAL_ENTRIES.filter((entry) => entry.tab === currentTab);

  return (
    <div className="flex flex-col">
      <h1 className="p-4 text-2xl capitalize border-b-[6px]">Path ID: {currentPathJournalId}</h1>

      <div className="flex-1 overflow-y-auto">
        <div>
          {filteredEntries.length !== 0 ? (
            filteredEntries.map((entry) => (
              <EntryCard entry={entry} currentTab={currentTab} key={entry.id} />
            ))
          ) : (
            <div className="text-center p-8">No entries in this journal yet.</div>
          )}
        </div>
      </div>

      <JournalTabs tabs={tabs} setTabs={setTabs} />
      <Button
        onClick={() => navigateToJournal(`new-${Date.now()}`)}
        size="icon"
        className="rounded-full p-6 fixed right-[20px] bottom-[100px] z-[5] transition-all hover:-translate-y-[2px]">
        <Plus className="!w-6 !h-6" strokeWidth={3} />
      </Button>
    </div>
  );
}
