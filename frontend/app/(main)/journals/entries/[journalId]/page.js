'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { JOURNAL_ENTRIES } from '@/lib/constants';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JournalEditor from '@/components/journals/JournalEditor';
import { useGetJournalById } from '@/hooks/useJournals';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useEffect } from 'react';

export default function JournalEntryPage() {
  const { journalId } = useParams();
  const { data: journal, loading, error, getJournalById } = useGetJournalById();

  useEffect(() => {
    getJournalById(journalId);
  }, []);

  if (loading || !journal) {
    return <LoadingSpinner />;
  }

  const { created_at, title, tab_id } = journal;

  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="p-6">
      <div className="flex gap-4 items-center">
        <Link href={`/journals/${tab_id ?? ''}`} className="block">
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
        <JournalEditor journal={journal} />
      </div>
    </div>
  );
}
