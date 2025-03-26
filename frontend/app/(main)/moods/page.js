'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
// import MoodSelector from '@/components/ui/MoodSelector';
import { MoodSelector } from '@/components/ui/mood-selector';

// import JournalTabs from '@/components/journals/JournalTabs';
// import EntryCard from '@/components/journals/EntryCard';
import { MoodCard } from '@/components/moods/MoodCard';
// import { useGetTabById } from '@/hooks/useTabs';
import {
    useGetMoods,
    useCreateMood,
    useUpdateMood,
    useDeleteMood,
} from '@/hooks/useMoods';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Modal from '@/components/common/Modal';
import { DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function MoodsPage() {
    const { toast } = useToast();
    const router = useRouter();

    //   const [journalName, setJournalName] = useState('Untitled Journal');
    //   const [journalTabSelected, setJournalTabSelected] = useState(currentTab);
    //   const [entries, setEntries] = useState([]);

    const [moods, setMoods] = useState([]);
    // const [newMoodText, setNewMoodText] = useState('');
    // const [editingMood, setEditingMood] = useState(null);

    // const { getTabById, loading: loadingTab, data: tab } = useGetTabById();

    // const { loading: loadingDaily, getDailyJournals } = useGetDailyJournals();
    // const { loading: loadingJournals, getJournals } = useGetJournals();
    // const { createJournal } = useCreateJournal();
    // const { updateJournal } = useUpdateJournal();
    // const { deleteJournal } = useDeleteJournal();

    useEffect(() => {
        //     getTabById(currentTab);
        //     fetchJournals();
        // }, [currentTab]);
        fetchMoods(); // Fetch all moods when the page loads
    }, []);

    const fetchMoods = async () => {
        try {
            // if (currentTab === '') {
            const res = await getMoods();
            setMoods(res);
            // } else {
            // const res = await getJournals(currentTab);
            // setEntries(res);
            // }
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Failed to fetch moods'
            });
        }
    };

    const handleCreateMood = async () => {
        try {
            const newMood = await createMood({
                title: journalName,
                content: '',
                tabId: journalTabSelected
            });

            router.push(`/journals/entries/${newJournal.id}`);
        } catch (err) {
            console.log(err);
            toast({
                title: 'Error',
                description: 'Failed to create new mood'
            });
        }
    };

    // if (loadingMoods) {
        // return <LoadingSpinner />;
    // }

    const handleDeleteMood = async (id) => {
        try {
            await deleteMood(id);
            await fetchMoods();
        } catch (err) {
            console.log(err);
        }
    };

    const editMoodHandler = async (id, name) => {
        try {
            await updateMood({ id, title: name });
            await fetchMoods();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col">
            <h1 className="p-4 text-2xl capitalize border-b-[6px]">
                {currentTab === '' ? 'Today\'s Moods' : tab && tab.data.name}
            </h1>

            <div className="flex-1 overflow-y-auto">
                <div>
                    {moods.length > 0 ? (
                        moods.map((mood) => (
                            <MoodCard
                                key={mood.id}
                                mood={mood} // Passing mood object to the MoodCard component
                                onDelete={handleDeleteMood} // Passing delete handler
                                onEdit={handleEditMood} // Passing edit handler
                            />
                        ))
                    ) : (
                        <div className="text-center p-8">No moods entered yet.</div>
                    )}
                </div>
            </div>

            <JournalTabs />
            <Modal
                title={'Add Mood'}
                trigger={
                    <Button
                        size="icon"
                        className="rounded-full p-6 fixed right-[20px] bottom-[100px] z-[5] transition-all hover:-translate-y-[2px]">
                        <Plus className="!w-6 !h-6" strokeWidth={3} />
                    </Button>
                }>
                <div>
                    <Label htmlFor="journal-name" className="text-right">
                        Journal Name
                    </Label>
                    <Input
                        value={journalName}
                        onChange={(e) => setJournalName(e.target.value)}
                        id="journal-name"
                        placeholder="Enter journal name"
                        className="col-span-3"
                    />
                </div>
                <div className="flex gap-2 mt-6">
                    <DialogClose className="flex-1" asChild>
                        <Button onClick={handleCreateJournal}>Create Journal</Button>
                    </DialogClose>
                    <DialogClose className="flex-1" asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                </div>
            </Modal>
        </div>
    );
}
