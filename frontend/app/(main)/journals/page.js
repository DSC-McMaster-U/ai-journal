'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Tabs from '@/components/journals/Tabs';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Menu, Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

export default function JournalsPage({ defaultTab = 'daily' }) {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const router = useRouter();

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

  const navigateToJournal = (id) => {
    router.push(`/journals/${currentTab}/${id}`);
  };

  const filteredEntries = journalEntries.filter((entry) => entry.tab === currentTab);

  return (
    <div className="flex flex-col">
      <Tabs currentTab={currentTab} onTabChange={setCurrentTab} />

      <div className="flex-1 overflow-y-auto">
        <div>
          {filteredEntries.length !== 0 ? (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between items-center pl-6 pr-2 border-t-2 border-b-2 border-neutral h-20 cursor-pointer hover:bg-neutral"
                onClick={() => navigateToJournal(entry.id)}>
                <div className="flex gap-8 items-center">
                  <div className="max-w-6 w-6 h-12 text-secondary flex flex-col items-center justify-center">
                    <p>{entry.date.split(' ')[0]}</p>
                    <p>{entry.date.split(' ')[1]}</p>
                  </div>
                  <div className="text-xl">
                    <h2 className="font-semibold text-secondary">{entry.title}</h2>
                    <p className="text-sm overflow-hidden truncate w-[180px]">
                      {entry.description}
                    </p>
                  </div>
                </div>

                <details className="dropdown dropdown-end">
                  <summary
                    className="btn btn-ghost m-1 text-3xl"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}>
                    <EllipsisVertical />
                  </summary>
                  <ul
                    className="menu dropdown-content bg-base-100 rounded-md z-[3] w-52 p-2 shadow max-w-24 font-semibold border"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}>
                    <li>
                      <a>Share</a>
                    </li>
                    <li className="text-red-500 active:text-red-500">
                      <a>Delete</a>
                    </li>
                  </ul>
                </details>
              </div>
            ))
          ) : (
            <div className="text-center p-8">No entries in your {getTabHeading()} yet.</div>
          )}
        </div>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            className="rounded-full p-6 fixed right-[20px] bottom-[165px] z-[5] transition-all hover:-translate-y-[2px]">
            <Menu className="!w-6 !h-6" strokeWidth={3} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="text-start">
            <SheetTitle>Journal Categories</SheetTitle>
            <SheetDescription>
              Navigate and manage your journal entries by categories
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">Here are your categories!</div>
        </SheetContent>
      </Sheet>

      <Button
        onClick={() => navigateToJournal(`new-${Date.now()}`)}
        size="icon"
        className="rounded-full p-6 fixed right-[20px] bottom-[100px] z-[5] transition-all hover:-translate-y-[2px]">
        <Plus className="!w-6 !h-6" strokeWidth={3} />
      </Button>
    </div>
  );
}
