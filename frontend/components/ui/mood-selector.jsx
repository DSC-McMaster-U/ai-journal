import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Smile, Frown, Meh, HeartOff } from 'lucide-react';

const moods = [
    { name: 'Happy', icon: <Smile size={24} /> },
    { name: 'Sad', icon: <Frown size={24} /> },
    { name: 'Neutral', icon: <Meh size={24} /> },
    { name: 'Heartbroken', icon: <HeartOff size={24} /> }
];

export const MoodSelector = () => {
    const [selectedMood, setSelectedMood] = React.useState(null);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Select Mood</Button>
            </PopoverTrigger>

            <PopoverContent>
                <h3>Select Your Mood</h3>
                <div className="flex justify-center gap-4">
                    {moods.map((mood) => (
                        <button
                            key={mood.name}
                            onClick={() => setSelectedMood(mood.name)}
                            className={`p-2 rounded-lg transition ${selectedMood === mood.name ? 'bg-primary text-background' : 'text-muted-foreground hover:bg-primary/10'}`}
                        >
                            {mood.icon}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    <p>Selected Mood: {selectedMood || 'None'}</p>
                </div>
            </PopoverContent>
        </Popover>
    );
};
