export default function JournalsPage() {
  // Placeholder data
  const journalEntries = [
    { id: "1", date: "Wed 9", title: "Day 231" },
    { id: "2", date: "Thurs 10", title: "Day 232" },
    { id: "3", date: "Fri 11", title: "Day 233" },
    { id: "4", date: "Sat 12", title: "Day 234" },
    { id: "5", date: "Sun 13", title: "Day 235" },
    { id: "6", date: "Mon 14", title: "Day 236" },
    { id: "7", date: "Tues 15", title: "Day 237" },
    { id: "8", date: "Wed 16", title: "Day 238" },
  ];

  return (
    <div className="flex-1">
      <div className="text-4xl px-8 pt-14 pb-5 font-bold">Journals</div>
      <div>
        {journalEntries.length !== 0 ? journalEntries.map((entry) => (
          <div key={entry.id} className="flex justify-between items-center bg-slate-50 px-5 border-t-4 h-20">
            <div className="flex gap-5">
              <div className="text-lg">{entry.date}</div>
              <div className="text-xl">{entry.title}</div>
            </div>
            <div>dot dot dot</div>
          </div>
        )) : (<div>No journal entries yet.</div>)}
      </div>
    </div>
  );
}