'use client';

import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Smile,
  Frown,
  Meh,
  Ghost,
  X,
  HeartOff,
  Laugh,
  Annoyed,
  Angry,
  Activity,
  Zap,
  Leaf,
  Snail,
  Shrink,
  MessageCircleQuestion,
  HandHelping,
  Bomb,
  PersonStanding,
  Rocket,
  MessageSquareWarning,
  MessageCircleMore,
  Plus
} from 'lucide-react';

export const MOODS = [
  { name: 'Happy', id: '5', icon: <Laugh size={24} /> },
  { name: 'Sad', id: '6', icon: <Frown size={24} /> },
  { name: 'Angry', id: '7', icon: <Angry size={24} /> },
  { name: 'Anxious', id: '4', icon: <Activity size={24} /> },
  { name: 'Excited', id: '3', icon: <Zap size={24} /> },
  { name: 'Calm', id: '1', icon: <Leaf size={24} /> },
  { name: 'Tired', id: '2', icon: <Snail size={24} /> },
  { name: 'Stressed', id: '8', icon: <Shrink size={24} /> },
  { name: 'Confused', id: '9', icon: <MessageCircleQuestion size={24} /> },
  { name: 'Grateful', id: '10', icon: <HandHelping size={24} /> },
  { name: 'Frustrated', id: '11', icon: <Bomb size={24} /> },
  { name: 'Lonely', id: '12', icon: <PersonStanding size={24} /> },
  { name: 'Confident', id: '13', icon: <Rocket size={24} /> },
  { name: 'Afraid', id: '14', icon: <MessageSquareWarning size={24} /> },
  { name: 'Content', id: '15', icon: <MessageCircleMore size={24} /> },
  { name: 'Bored', id: '16', icon: <Meh size={24} /> }
];

export const MoodSelector = ({ onSubmit }) => {
  const [selectedMoods, setSelectedMoods] = React.useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

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
