'use client';

import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const MOODS = [
  { name: 'Happy', id: '5', icon: '😊' },
  { name: 'Sad', id: '6', icon: '😢' },
  { name: 'Angry', id: '7', icon: '😡' },
  { name: 'Anxious', id: '4', icon: '😰' },
  { name: 'Excited', id: '3', icon: '🤩' },
  { name: 'Calm', id: '1', icon: '😌' },
  { name: 'Tired', id: '2', icon: '😴' },
  { name: 'Stressed', id: '8', icon: '😫' },
  { name: 'Confused', id: '9', icon: '🤔' },
  { name: 'Grateful', id: '10', icon: '🙏' },
  { name: 'Frustrated', id: '11', icon: '😤' },
  { name: 'Lonely', id: '12', icon: '🥺' },
  { name: 'Confident', id: '13', icon: '💪' },
  { name: 'Afraid', id: '14', icon: '😨' },
  { name: 'Content', id: '15', icon: '🥰' },
  { name: 'Bored', id: '16', icon: '🥱' }
];

export const MoodSelector = ({ onSubmit }) => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const toggleMood = (moodId) => {
    setSelectedMoods((prevMoods) =>
      prevMoods.includes(moodId) ? prevMoods.filter((id) => id !== moodId) : [...prevMoods, moodId]
    );
  };

  const minimizeClick = () => {
    setIsPopoverOpen(false);
    setSelectedMoods([]);
  };

  const handleSubmit = () => {
    console.log('Selected moods: ', selectedMoods);
    setIsPopoverOpen(false);
    setSelectedMoods([]);
    onSubmit?.(selectedMoods);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="default">
          <Plus /> Mood Entry
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-popover text-popover-foreground border-border p-4 rounded-lg shadow-lg mr-4">
        <div className="relative w-64 h-64 flex items-center justify-center flex-wrap">
          {MOODS.map((mood) => {
            return (
              <Button
                key={mood.name}
                onClick={() => toggleMood(mood.id)}
                className={`w-16 h-16 rounded-full flex flex-col items-center justify-center gap-1`}
                variant={selectedMoods.includes(mood.id) ? 'secondary' : 'ghost'}>
                {mood.icon}
                <span className="text-xs">{mood.name}</span>
              </Button>
            );
          })}
        </div>

        <div className="flex items-center justify-center mt-4 gap-2">
          <Button variant="outline" onClick={minimizeClick}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
