import Link from "next/link";

export default function JournalPage({ params }) {
    return (
        <div>
            This is a TEMPORARY JOURNAL PAGE for {params.journalId}
            <div>
                <Link href={`/journals`} className="btn">Go back to journals</Link>
            </div>
        </div>
    );
}