'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { JOURNAL_ENTRIES } from '@/lib/constants';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JournalEditor from '@/components/journals/JournalEditor';

export default function JournalEntryPage() {
  const params = useParams();

  const entry = JOURNAL_ENTRIES.find((entry) => entry.id === params.journalId);

  const { id, date, title, description, tab, content } = entry;

  // TODO: show the actual date
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="p-6">
      <div className="flex gap-4 items-center">
        <Link href={`/journals/${params.tab}`} className="block">
          <Button size="icon" className="rounded-full" variant="secondary">
            <ChevronLeft />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted">{formattedDate}</p>
        </div>
      </div>

      <div className="mt-4 no-tailwindcss-base relative !z-20">
        <JournalEditor entry={entry} />
      </div>
    </div>
  );
}
