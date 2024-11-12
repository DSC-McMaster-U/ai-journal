'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaEllipsisVertical,
  FaPlus,
  FaRegFaceAngry,
  FaRegFaceDizzy,
  FaRegFaceFlushed,
  FaRegFaceFrown
} from 'react-icons/fa6';

export default function JournalsPage() {
  // Placeholder data
  const [journalEntries, setJournalEntries] = useState([
    { id: '1', date: 'Wed 9', title: 'Day 231', description: 'Lorem ipsum dolor sit amet' },
    { id: '2', date: 'Thurs 10', title: 'Day 232', description: 'Consectetur adipiscing elit' },
    { id: '3', date: 'Fri 11', title: 'Day 233', description: 'Sed do eiusmod tempor incididunt' },
    { id: '4', date: 'Sat 12', title: 'Day 234', description: 'Ut labore et dolore magna aliqua' },
    { id: '5', date: 'Sun 13', title: 'Day 235', description: 'Ut enim ad minim veniam' },
    { id: '6', date: 'Mon 14', title: 'Day 236', description: 'Quis nostrud exercitation ullamco' },
    {
      id: '7',
      date: 'Tues 15',
      title: 'Day 237',
      description: 'Laboris nisi ut aliquip ex ea commodo consequat'
    },
    {
      id: '8',
      date: 'Wed 16',
      title: 'Day 238',
      description: 'Duis aute irure dolor in reprehenderit'
    },
    { id: '9', date: 'Wed 9', title: 'Day 231', description: 'Lorem ipsum dolor sit amet' },
    { id: '10', date: 'Thurs 10', title: 'Day 232', description: 'Consectetur adipiscing elit' },
    { id: '11', date: 'Fri 11', title: 'Day 233', description: 'Sed do eiusmod tempor incididunt' },
    { id: '12', date: 'Sat 12', title: 'Day 234', description: 'Ut labore et dolore magna aliqua' },
    { id: '13', date: 'Sun 13', title: 'Day 235', description: 'Ut enim ad minim veniam' },
    {
      id: '14',
      date: 'Mon 14',
      title: 'Day 236',
      description: 'Quis nostrud exercitation ullamco'
    },
    {
      id: '15',
      date: 'Tues 15',
      title: 'Day 237',
      description: 'Laboris nisi ut aliquip ex ea commodo consequat'
    },
    {
      id: '16',
      date: 'Wed 16',
      title: 'Day 238',
      description: 'Duis aute irure dolor in reprehenderit'
    }
  ]);

  const router = useRouter();
  const navigateToJournal = (id) => {
    router.push(`/journals/${id}`);
  };

  // Prevents drop down menu buttons from
  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <h1 className="text-4xl px-8 pt-8 pb-5 font-bold text-primary">Journals</h1>
      <div>
        {journalEntries.length !== 0 ? (
          journalEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex justify-between items-center pl-6 pr-2 border-t-4 border-neutral h-20 cursor-pointer hover:bg-neutral"
              onClick={() => navigateToJournal(entry.id)}>
              <div className="flex gap-8 items-center">
                <div className="max-w-6 w-6 h-12 text-secondary flex flex-col items-center justify-center">
                  <p>{entry.date.split(' ')[0]}</p>
                  <p>{entry.date.split(' ')[1]}</p>
                </div>
                <div className="text-xl">
                  <h2 className="font-semibold text-secondary">{entry.title}</h2>
                  {/* <div className="flex gap-2 mt-1">
                    <FaRegFaceAngry />
                    <FaRegFaceDizzy />
                    <FaRegFaceFlushed />
                    <FaRegFaceFrown />
                  </div> */}
                  <p className="text-sm overflow-hidden truncate w-[180px]">{entry.description}</p>
                </div>
              </div>
              <details className="dropdown dropdown-end">
                <summary className="btn btn-ghost m-1 text-3xl" onClick={preventPropagation}>
                  <FaEllipsisVertical />
                </summary>
                <ul
                  className="menu dropdown-content bg-base-100 rounded-md z-[3] w-52 p-2 shadow max-w-24 font-semibold border"
                  onClick={preventPropagation}>
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
          <div>No journal entries yet.</div>
        )}
      </div>
      <button
        className="bg-base-100 fixed btn btn-outline btn-primary right-6 bottom-20 rounded-full w-14 h-14 shadow-md z-[5]"
        onClick={() => navigateToJournal(`temp-id`)}>
        <FaPlus size={32} />
      </button>
    </div>
  );
}
