import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Smile, Frown, Meh, Ghost, HeartOff, Snowflake, Laugh, Annoyed, Angry, Activity } from 'lucide-react';

const moods = [
    { name: 'heartsick', icon: <HeartOff size={24} /> },
    { name: 'joy', icon: <Smile size={24} /> },
    { name: 'sad', icon: <Frown size={24} /> },
    { name: 'empty', icon: <Meh size={24} /> },
    { name: 'lonely', icon: <Ghost size={24} /> },
    { name: 'excited', icon: <Laugh size={24} /> },
    // { name: 'chill', icon: <Snowflake size={24} /> },
    { name: 'mad', icon: <Angry size={24} /> },
    { name: 'annoyed', icon: <Annoyed size={24} /> },
    { name: 'anxious', icon: <Activity size={24} /> },
];

export const MoodSelector = () => {
    const [selectedMoods, setSelectedMoods] = React.useState([]);

    const toggleMood = (moodName) => {
        setSelectedMoods((prevMoods) =>
            prevMoods.includes(moodName)
                ? prevMoods.filter((mood) => mood !== moodName) // Remove if already selected
                : [...prevMoods, moodName] // Add if not selected
        );
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Select Mood</Button>
            </PopoverTrigger>

            <PopoverContent>
                <div className="relative w-64 h-64 flex items-center justify-center">
                    {moods.map((mood, index) => {
                        const angle = (index / moods.length) * 360;
                        return (
                            <button
                                key={mood.name}
                                onClick={() => toggleMood(mood.name)}
                                className={`absolute p-2 flex flex-col items-center justify-center rounded-full transition ${selectedMoods.includes(mood.name) ? 'bg-primary text-background' : 'text-muted-foreground hover:bg-primary/10'}`}
                                style={{
                                    transform: `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`,
                                }}
                            >
                                {mood.icon}
                                <span className="text-sm">{mood.name}</span>
                            </button>
                        );
                    })}
                </div>


                <div className="mt-4">
                    {/* <p>Selected Mood: {selectedMood || 'None'}</p> */}
                </div>
            </PopoverContent>
        </Popover>
    );
};
