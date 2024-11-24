'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function JournalEntryPage() {
    const params = useParams();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">
                Journal Entry in {params.tab} tab
            </h1>
            <div>
                This is journal {params.journalId}
            </div>
            <div className="mt-4">
                <Link href={`/journals/${params.tab}`} className="btn btn-primary">
                    Back to {params.tab} journals
                </Link>
            </div>
        </div>
    );
}