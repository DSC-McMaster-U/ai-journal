'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faFaceFrown, faFaceFrownOpen, faFaceGrin, faFaceLaugh, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function JournalsPage() {

  // Placeholder data
  const [journalEntries, setJournalEntries] = useState([
    { id: "1", date: "Wed 9", title: "Day 231" },
    { id: "2", date: "Thurs 10", title: "Day 232" },
    { id: "3", date: "Fri 11", title: "Day 233" },
    { id: "4", date: "Sat 12", title: "Day 234" },
    { id: "5", date: "Sun 13", title: "Day 235" },
    { id: "6", date: "Mon 14", title: "Day 236" },
    { id: "7", date: "Tues 15", title: "Day 237" },
    { id: "8", date: "Wed 16", title: "Day 238" },

    // More entries just to test
    { id: "9", date: "Wed 9", title: "Day 231" },
    { id: "10", date: "Thurs 10", title: "Day 232" },
    { id: "11", date: "Fri 11", title: "Day 233" },
    { id: "12", date: "Sat 12", title: "Day 234" },
    { id: "13", date: "Sun 13", title: "Day 235" },
    { id: "14", date: "Mon 14", title: "Day 236" },
    { id: "15", date: "Tues 15", title: "Day 237" },
    { id: "16", date: "Wed 16", title: "Day 238" },
  ]);

  const router = useRouter();
  const navigateToJournal = (id) => {
    router.push(`/journals/${id}`);
  }

  // Prevents drop down menu buttons from 
  const preventPropagation = (e) => {
    e.stopPropagation();
  }

  return (
    <div className="flex-1">
      <div className="text-4xl px-8 pt-12 pb-5 font-bold">Journals</div>
      <div className="overflow-y-scroll" style={{ height: 'calc(94vh - 5rem - 3.5rem - 1.25rem'}}>
        {journalEntries.length !== 0 ? journalEntries.map((entry) => (
          <div key={entry.id} className="flex justify-between items-center bg-slate-50 active:bg-slate-100 pl-6 pr-2 border-t-4 h-20" onClick={() => navigateToJournal(entry.id)}>
            <div className="flex gap-12">
              <div className="text-lg text-slate-600 text-wrap text-center max-w-6">{entry.date}</div>
              <div className="text-xl">
                <div className="text-slate-700 font-semibold">{entry.title}</div>
                <div className="flex gap-2 text-slate-600">
                  <FontAwesomeIcon icon={faFaceLaugh} />
                  <FontAwesomeIcon icon={faFaceGrin} />
                  <FontAwesomeIcon icon={faFaceFrownOpen} />
                  <FontAwesomeIcon icon={faFaceFrown} />
                </div>
              </div>
            </div>
            <details className="dropdown dropdown-end">
              <summary className="btn m-1 text-3xl text-slate-600 active:text-slate-950 bg-transparent border-none shadow-none" onClick={preventPropagation}><FontAwesomeIcon icon={faEllipsisVertical}/></summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[3] w-52 p-2 shadow max-w-24 font-semibold" onClick={preventPropagation}>
                <li className="text-red-500 active:text-red-500"><a>Delete</a></li>
                <li><a>Share</a></li>
              </ul>
            </details>
          </div>
        )) : (<div>No journal entries yet.</div>)}
      </div>
      <button className="fixed btn right-3 bottom-28 rounded-full w-20 h-20 bg-indigo-100 active:bg-indigo-300 shadow-md z-[5]" onClick={() => navigateToJournal(`temp-id`)}>
        <FontAwesomeIcon icon={faPlus} className="text-4xl"/>
      </button>
    </div>
  );
}
