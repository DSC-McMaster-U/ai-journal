'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MOODS, MoodSelector } from '@/components/ui/mood-selector';
import { useGetMoods, useCreateMood, useDeleteMood } from '@/hooks/useMoods';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ChevronDown, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { format, isToday } from 'date-fns';

export default function MoodsPage() {
  const { toast } = useToast();
  const [moodEntries, setMoodEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { loading: loadingMoods, getMoods } = useGetMoods();
  const { createMood, loading: creatingMood } = useCreateMood();
  const { deleteMood, loading: deletingMood } = useDeleteMood();

  useEffect(() => {
    fetchMoods();
  }, [selectedDate]);

  const fetchMoods = async () => {
    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const moods = await getMoods(`/moods/${formattedDate}`);
      setMoodEntries(moods || []);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch mood entries'
      });
    }
  };

  const handleCreateMood = async (selectedMoods) => {
    if (selectedMoods.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one mood'
      });
      return;
    }

    try {
      await createMood({
        moods: selectedMoods,
        date: format(selectedDate, 'yyyy-MM-dd')
      });
      toast({
        title: 'Success',
        description: 'Mood entry added successfully'
      });
      fetchMoods();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create mood entry'
      });
    }
  };

  const handleDeleteMood = async (id) => {
    try {
      await deleteMood(id);
      await fetchMoods();
      toast({
        title: 'Success',
        description: 'Mood entry deleted successfully'
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete mood entry'
      });
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getHeaderText = () => {
    if (isToday(selectedDate)) {
      return "Today's Moods";
    }
    return `Moods for ${format(selectedDate, 'MMMM d, yyyy')}`;
  };

  if (loadingMoods) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="p-4 text-2xl border-b-[6px]">Mood Tracker</h1>

      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl mb-4">{getHeaderText()}</h2>
        <div className="flex items-center justify-between mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {format(selectedDate, 'MMM d, yyyy')}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
              <div className="flex items-center p-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="border-none shadow-none"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {isToday(selectedDate) && <MoodSelector onSubmit={handleCreateMood} />}
        </div>
        {moodEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moodEntries
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((entry) => (
                <div
                  key={entry.mood_instance_id}
                  className="p-4 border rounded-lg shadow-sm bg-card">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Your mood at{' '}
                      {new Date(entry.created_at).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric'
                      })}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMood(entry.mood_instance_id)}
                      disabled={deletingMood}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 my-2">
                    {entry.user_moods.map((mood, index) => {
                      const moodInfo = MOODS.find((m) => +m.id === +mood.mood_id);
                      return (
                        <div
                          key={index}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full flex items-center gap-1.5">
                          {moodInfo?.icon}
                          <span className="text-xs">{moodInfo?.name || mood.mood_id}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            {isToday(selectedDate)
              ? 'No mood entries for today. Track your mood using the selector above!'
              : 'No mood entries for this date.'}
          </div>
        )}
      </div>
    </div>
  );
}
