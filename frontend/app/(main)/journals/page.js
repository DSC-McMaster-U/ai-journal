'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import JournalTabs from '@/components/journals/JournalTabs';
import EntryCard from '@/components/journals/EntryCard';

export default function JournalsPage({ defaultTab = 'daily' }) {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const pathName = usePathname();

  const currentPathJournalId = pathName.split('/').pop();

  useEffect(() => {
    setCurrentTab(defaultTab);
  }, [defaultTab]);

  const [journalEntries] = useState([
    // Daily Journal Entries
    {
      id: '1',

      date: 'Wed 9',
      title: 'Morning Reflection',
      description: 'Started the day with meditation and gratitude practice',
      tab: 'daily'
    },
    {
      id: '2',
      date: 'Thurs 10',
      title: 'Productive Day',
      description: 'Completed all tasks on my to-do list and had a great workout',
      tab: 'daily'
    },
    {
      id: '3',
      date: 'Fri 11',
      title: 'Weekend Plans',
      description: 'Planning to go hiking and catch up with friends',
      tab: 'daily'
    },

    // Gratitude Journal Entries
    {
      id: '4',
      date: 'Wed 9',
      title: 'Family Time',
      description: 'Grateful for the wonderful dinner with family',
      tab: 'gratitude'
    },
    {
      id: '5',
      date: 'Thurs 10',
      title: 'Career Growth',
      description: 'Thankful for new opportunities at work',
      tab: 'gratitude'
    },
    {
      id: '6',
      date: 'Fri 11',
      title: 'Health & Wellness',
      description: 'Grateful for my health and ability to exercise',
      tab: 'gratitude'
    },

    // Dream Journal Entries
    {
      id: '7',
      date: 'Wed 9',
      title: 'Flying Dreams',
      description: 'Dreamt of flying over mountains and oceans',
      tab: 'dreams'
    },
    {
      id: '8',
      date: 'Thurs 10',
      title: 'Childhood Home',
      description: 'Vivid dream about returning to my childhood home',
      tab: 'dreams'
    },
    {
      id: '9',
      date: 'Fri 11',
      title: 'Adventure Dream',
      description: 'Exploring ancient ruins in my dreams',
      tab: 'dreams'
    },

    // Goals Journal Entries
    {
      id: '10',
      date: 'Wed 9',
      title: 'Fitness Goals',
      description: 'Run 5k three times per week, strength training twice',
      tab: 'goals'
    },
    {
      id: '11',
      date: 'Thurs 10',
      title: 'Career Objectives',
      description: 'Complete web development certification by December',
      tab: 'goals'
    },
    {
      id: '12',
      date: 'Fri 11',
      title: 'Personal Growth',
      description: 'Read one book per month, practice meditation daily',
      tab: 'goals'
    },

    // Creative Writing Journal Entries
    {
      id: '13',
      date: 'Wed 9',
      title: 'Short Story: The Window',
      description: 'A story about a mysterious window that shows different realities',
      tab: 'creative'
    },
    {
      id: '14',
      date: 'Thurs 10',
      title: 'Poetry: Sunrise',
      description: 'Poem about the beauty of dawn and new beginnings',
      tab: 'creative'
    },
    {
      id: '15',
      date: 'Fri 11',
      title: 'Character Sketch',
      description: 'Developing a character for my upcoming story',
      tab: 'creative'
    }
  ]);

  const filteredEntries = journalEntries.filter((entry) => entry.tab === currentTab);

  return (
    <div className="flex flex-col">
      {/* <Tabs currentTab={currentTab} onTabChange={setCurrentTab} /> */}

      <h1 className="p-4 text-2xl capitalize">Current Path ID: {currentPathJournalId}</h1>

      <div className="flex-1 overflow-y-auto">
        <div>
          {filteredEntries.length !== 0 ? (
            filteredEntries.map((entry) => <EntryCard entry={entry} currentTab={currentTab} />)
          ) : (
            <div className="text-center p-8">No entries in this journal yet.</div>
          )}
        </div>
      </div>

      <JournalTabs />
      <Button
        onClick={() => navigateToJournal(`new-${Date.now()}`)}
        size="icon"
        className="rounded-full p-6 fixed right-[20px] bottom-[100px] z-[5] transition-all hover:-translate-y-[2px]">
        <Plus className="!w-6 !h-6" strokeWidth={3} />
      </Button>
    </div>
  );
}
