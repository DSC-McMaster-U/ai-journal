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
  Activity
} from 'lucide-react';

const moods = [
  { name: 'heartsick', icon: <HeartOff size={24} /> },
  { name: 'sad', icon: <Frown size={24} /> },
  { name: 'excited', icon: <Laugh size={24} /> },
  { name: 'mad', icon: <Angry size={24} /> },
  { name: 'annoyed', icon: <Annoyed size={24} /> },
  { name: 'lonely', icon: <Ghost size={24} /> },
  { name: 'anxious', icon: <Activity size={24} /> },
  { name: 'joy', icon: <Smile size={24} /> },
  { name: 'empty', icon: <Meh size={24} /> }
];

export const MoodSelector = () => {
  const [selectedMoods, setSelectedMoods] = React.useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  useEffect(() => {
    setSelectedMoods(initialMoods);
  }, [initialMoods]);

  const toggleMood = (moodName) => {
    setSelectedMoods((prevMoods) =>
      prevMoods.includes(moodName)
        ? prevMoods.filter((mood) => mood !== moodName)
        : [...prevMoods, moodName]
    );
  };

  const minimizeClick = () => {
    setIsPopoverOpen(false);
    setSelectedMoods([]);
  };

  const handleSubmit = () => {
    console.log('Selected moods: ', selectedMoods);
    setIsPopoverOpen(false);
    // setSelectedMoods([]);
    onSubmit?.(selectedMoods);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="default">Select Moods</Button>
      </PopoverTrigger>

      <PopoverContent className="bg-popover text-popover-foreground border-border p-4 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <Button variant="outline" className="w-8 h-8" onClick={minimizeClick}>
            <X />
          </Button>
        </div>

        <div className="relative w-64 h-64 flex items-center justify-center">
          {moods.map((mood, index) => {
            const angle = (index / moods.length) * 360;
            return (
              <Button
                key={mood.name}
                onClick={() => toggleMood(mood.name)}
                className={`absolute w-16 h-16 rounded-full flex flex-col items-center justify-center gap-1`}
                variant={selectedMoods.includes(mood.name) ? 'secondary' : 'ghost'}
                style={{
                  transform: `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`
                }}>
                {mood.icon}
                <span className="text-xs">{mood.name}</span>
              </Button>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={handleSubmit}>
            <span>Submit!</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
