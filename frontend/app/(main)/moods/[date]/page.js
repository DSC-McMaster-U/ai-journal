'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { useGetMoods, useUpdateMood, useDeleteMood, useGetMoodTypes, useCreateMood } from '@/hooks/useMoods';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import AlertModal from '@/components/common/AlertModal';
import { MoreVertical, Edit, Trash, Calendar, ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';

// Emoji mapping for mood types (can be expanded)
const MOOD_EMOJIS = {
    'Happy': '😊',
    'Sad': '😢',
    'Angry': '😡',
    'Anxious': '😰',
    'Excited': '🤩',
    'Relaxed': '😌',
    'Tired': '😴',
    'Energetic': '⚡',
    'Calm': '😌',
    'Stressed': '😖',
    'Content': '🙂',
    'Lonely': '🥺',
    'Grateful': '🙏',
    'Bored': '😐',
    'Hopeful': '🌈',
    'Loved': '❤️',
    'Irritated': '😤',
    'Motivated': '💪',
    'Overwhelmed': '😵',
    'Proud': '🥲',
    'Frustrated': '😤',
    // Add default emoji for unknown mood types
    'default': '😶'
};

export default function MoodsByDatePage({ params }) {
    const router = useRouter();
    const { date } = params;

    // State management
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedMoodInstance, setSelectedMoodInstance] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [createError, setCreateError] = useState(null);
    const [editError, setEditError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [notification, setNotification] = useState(null);

    // Hooks for API calls
    const { data: moodEntries, loading: loadingMoods, error: moodsError, getMoods } = useGetMoods();
    const { data: moodTypes, loading: loadingMoodTypes, error: moodTypesError, getMoodTypes } = useGetMoodTypes();
    const { updateMood, loading: updatingMood } = useUpdateMood();
    const { deleteMood, loading: deletingMood } = useDeleteMood();
    const { createMood, loading: creatingMood } = useCreateMood();

    // Clear notification after delay
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    // Fetch mood entries for the specific date
    const fetchMoodEntries = useCallback(() => {
        if (date) {
            console.log(`Fetching moods for date: ${date}`);
            return getMoods(`/moods/${date}`);
        }
    }, [date, getMoods]);

    // Fetch mood types for the selector
    const fetchMoodTypes = useCallback(() => {
        console.log('Fetching mood types');
        return getMoodTypes();
    }, [getMoodTypes]);

    // Initialize the date properly - runs once when the date param changes
    useEffect(() => {
        if (date) {
            try {
                const parsedDate = new Date(date);
                if (!isNaN(parsedDate.getTime())) {
                    setSelectedDate(parsedDate);
                } else {
                    // If date is invalid, redirect to today
                    const today = format(new Date(), 'yyyy-MM-dd');
                    router.push(`/moods/${today}`);
                }
            } catch (error) {
                console.error("Invalid date format:", error);
                // If date parsing fails, redirect to today
                const today = format(new Date(), 'yyyy-MM-dd');
                router.push(`/moods/${today}`);
            }
        }
    }, [date, router]);

    // Fetch mood entries when the date changes
    useEffect(() => {
        if (date) {
            fetchMoodEntries();
        }
    }, [date, fetchMoodEntries]);

    // Fetch mood types when component mounts
    useEffect(() => {
        fetchMoodTypes();
    }, [fetchMoodTypes]);

    // Get emoji for a mood type
    const getMoodEmoji = (moodId) => {
        if (!moodTypes) return MOOD_EMOJIS.default;

        const mood = moodTypes.find(m => m.id === moodId);
        if (!mood) return MOOD_EMOJIS.default;

        return MOOD_EMOJIS[mood.name] || MOOD_EMOJIS.default;
    };

    // Handle date selection from date picker
    const handleDateSelect = (selectedDay) => {
        if (selectedDay) {
            const formattedDay = format(selectedDay, 'yyyy-MM-dd');
            router.push(`/moods/${formattedDay}`);
            setIsDatePickerOpen(false);
        }
    };

    // Navigate to previous day
    const goToPreviousDay = () => {
        if (selectedDate) {
            const prevDay = new Date(selectedDate);
            prevDay.setDate(prevDay.getDate() - 1);
            const formattedDay = format(prevDay, 'yyyy-MM-dd');
            router.push(`/moods/${formattedDay}`);
        }
    };

    // Navigate to next day
    const goToNextDay = () => {
        if (selectedDate) {
            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);
            const formattedDay = format(nextDay, 'yyyy-MM-dd');
            router.push(`/moods/${formattedDay}`);
        }
    };

    // Toggle date picker
    const toggleDatePicker = (isOpen) => {
        setIsDatePickerOpen(isOpen);
    };

    // Toggle create modal
    const toggleCreateModal = (isOpen) => {
        setIsCreateModalOpen(isOpen);
        if (!isOpen) {
            setCreateError(null);
            setSelectedMoods([]);
        }
    };

    // Toggle edit modal
    const toggleEditModal = (isOpen) => {
        setIsEditModalOpen(isOpen);
        if (!isOpen) {
            setEditError(null);
        }
    };

    // Toggle delete modal
    const toggleDeleteModal = (isOpen) => {
        setIsDeleteModalOpen(isOpen);
        if (!isOpen) {
            setDeleteError(null);
        }
    };

    // Open create mood modal
    const handleOpenCreateModal = () => {
        setSelectedMoods([]);
        setCreateError(null);
        setIsCreateModalOpen(true);
    };

    // Handle edit mood - open edit dialog with selected mood
    const handleEditMood = (moodInstance) => {
        if (moodInstance && moodInstance.user_moods) {
            setSelectedMoodInstance(moodInstance);
            setSelectedMoods(moodInstance.user_moods.map(mood => mood.mood_id.toString()));
            setEditError(null);
            setIsEditModalOpen(true);
        } else {
            showNotification('Error: Mood data is incomplete', 'error');
        }
    };

    // Handle delete mood - open delete confirmation
    const handleDeleteMood = (moodInstance) => {
        if (moodInstance && moodInstance.mood_instance_id) {
            setSelectedMoodInstance(moodInstance);
            setDeleteError(null);
            setIsDeleteModalOpen(true);
        } else {
            showNotification('Error: Cannot delete this mood', 'error');
        }
    };

    // Submit mood edit
    const handleSubmitEdit = async () => {
        if (!selectedMoodInstance || !selectedMoodInstance.mood_instance_id) {
            showNotification('Error: No mood selected', 'error');
            return;
        }

        if (selectedMoods.length === 0) {
            setEditError("Please select at least one mood");
            return;
        }

        setEditError(null);
        try {
            console.log(`Updating mood ${selectedMoodInstance.mood_instance_id} with moods:`, selectedMoods);

            const response = await updateMood(selectedMoodInstance.mood_instance_id, { moods: selectedMoods });

            if (response) {
                console.log('Successfully updated mood:', response);
                setIsEditModalOpen(false);
                // Refetch mood entries to update the UI
                await fetchMoodEntries();
                // Show success notification
                showNotification('Mood updated successfully');
            } else {
                throw new Error('Failed to update mood');
            }
        } catch (error) {
            console.error('Error updating mood:', error);
            setEditError(
                error.message === 'Failed to fetch'
                    ? 'Network error. Please check your connection.'
                    : error.message || 'Failed to update mood'
            );
        }
    };

    // Submit mood delete
    const handleSubmitDelete = async () => {
        if (!selectedMoodInstance || !selectedMoodInstance.mood_instance_id) {
            showNotification('Error: No mood selected', 'error');
            return;
        }

        setDeleteError(null);
        try {
            console.log(`Deleting mood ${selectedMoodInstance.mood_instance_id}`);

            const response = await deleteMood(selectedMoodInstance.mood_instance_id);

            if (response !== null) {
                console.log('Successfully deleted mood:', response);
                setIsDeleteModalOpen(false);
                // Refetch mood entries to update the UI
                await fetchMoodEntries();
                // Show success notification
                showNotification('Mood deleted successfully');
            } else {
                throw new Error('Failed to delete mood');
            }
        } catch (error) {
            console.error('Error deleting mood:', error);
            setDeleteError(
                error.message === 'Failed to fetch'
                    ? 'Network error. Please check your connection.'
                    : error.message || 'Failed to delete mood'
            );
        }
    };

    // Submit new mood creation
    const handleSubmitCreate = async () => {
        if (selectedMoods.length === 0) {
            setCreateError("Please select at least one mood");
            return;
        }

        setCreateError(null);
        try {
            // Check if we're on today's date page
            const today = format(new Date(), 'yyyy-MM-dd');
            const isToday = date === today;

            // Create payload with just the moods array
            const payload = { moods: selectedMoods };

            console.log('Creating mood with payload:', payload);

            const result = await createMood(payload);

            if (result && !result.error) {
                console.log('Create mood result:', result);
                setIsCreateModalOpen(false);
                // Clear selection
                setSelectedMoods([]);

                if (isToday) {
                    // If we're already on today's page, just refresh
                    await fetchMoodEntries();
                    showNotification('Mood created successfully');
                } else {
                    // If we're on another date, show notification and redirect to today
                    showNotification('Mood created successfully for today. Redirecting to today\'s page...', 'info');

                    // Give time for notification to be visible before redirecting
                    setTimeout(() => {
                        router.push(`/moods/${today}`);
                    }, 1500);
                }
            } else {
                throw new Error(result?.error || 'Failed to create mood');
            }
        } catch (error) {
            console.error('Error creating mood:', error);
            setCreateError(
                error.message === 'Failed to fetch'
                    ? 'Network error. Please check your connection.'
                    : error.message || 'Failed to create mood'
            );
        }
    };

    // Toggle mood selection in edit/create modals
    const toggleMoodSelection = (moodId) => {
        if (selectedMoods.includes(moodId)) {
            setSelectedMoods(selectedMoods.filter(id => id !== moodId));
        } else {
            setSelectedMoods([...selectedMoods, moodId]);
        }
    };

    // Format time from ISO string
    const formatTime = (isoString) => {
        try {
            if (!isoString) return "Unknown time";

            // Parse the ISO date string
            const date = parseISO(isoString);
            if (isNaN(date.getTime())) return "Invalid date";

            return format(date, 'h:mm a');
        } catch (error) {
            console.error("Error formatting time:", error);
            return "Unknown time";
        }
    };

    // Loading state
    if (loadingMoodTypes || loadingMoods || !selectedDate) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    // Error state
    if (moodsError) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">Error loading mood entries: {moodsError.message}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {notification && (
                <div className={`fixed top-4 right-4 z-50 py-2 px-4 rounded-md shadow-md 
                    ${notification.type === 'success' ? 'bg-green-100 border-green-500 text-green-700' :
                        notification.type === 'error' ? 'bg-red-100 border-red-500 text-red-700' :
                            'bg-blue-100 border-blue-500 text-blue-700'} 
                    border flex items-center transition-opacity duration-300`}>
                    {notification.type === 'success' && <Check className="h-4 w-4 mr-2" />}
                    {notification.message}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">
                    Moods for {format(selectedDate, 'MMMM d, yyyy')}
                </h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={goToPreviousDay} aria-label="Previous day">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => setIsDatePickerOpen(true)}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Change Date
                    </Button>
                    <Button variant="outline" size="icon" onClick={goToNextDay} aria-label="Next day">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Create Mood Button */}
            <div className="mb-6">
                <Button onClick={handleOpenCreateModal} className="w-full md:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Mood Entry
                </Button>
            </div>

            {/* Mood entries display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {moodEntries && moodEntries.length > 0 ? (
                    moodEntries.map((entry) => (
                        <Card key={entry.mood_instance_id || `mood-${Math.random()}`} className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {formatTime(entry.created_at)}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {entry.user_moods && entry.user_moods.map((mood, index) => {
                                                const moodType = moodTypes?.find(m => m.id === mood.mood_id);
                                                return (
                                                    <span
                                                        key={`${mood.id || mood.mood_id}_${index}`}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                                        title={moodType?.name || `Mood ${mood.mood_id}`}
                                                    >
                                                        <span className="mr-1 text-lg">{getMoodEmoji(mood.mood_id)}</span>
                                                        {moodType?.name || `Mood ${mood.mood_id}`}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEditMood(entry)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => handleDeleteMood(entry)}
                                                className="text-destructive focus:text-destructive"
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className="text-muted-foreground">No mood entries for this date.</p>
                    </div>
                )}
            </div>

            {/* Date Picker Dialog */}
            <Dialog open={isDatePickerOpen} onOpenChange={toggleDatePicker}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Select a date</DialogTitle>
                        <DialogDescription>
                            Choose a date to view mood entries
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            defaultMonth={selectedDate}
                            className="border-none"
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Create Mood Dialog */}
            <Dialog open={isCreateModalOpen} onOpenChange={toggleCreateModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create New Mood Entry</DialogTitle>
                        <DialogDescription>
                            Select the moods that best describe how you're feeling right now
                            {date !== format(new Date(), 'yyyy-MM-dd') && (
                                <div className="mt-2 text-amber-600 font-medium">
                                    Note: Moods are always created for today's date
                                </div>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    {createError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                            {createError}
                        </div>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-4">
                        {moodTypes?.map((mood) => (
                            <Button
                                key={mood.id}
                                variant={selectedMoods.includes(mood.id.toString()) ? "default" : "outline"}
                                className="h-auto py-2"
                                onClick={() => toggleMoodSelection(mood.id.toString())}
                            >
                                <span className="mr-1 text-lg">{MOOD_EMOJIS[mood.name] || MOOD_EMOJIS.default}</span>
                                {mood.name}
                            </Button>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsCreateModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitCreate}
                            disabled={creatingMood || selectedMoods.length === 0}
                        >
                            {creatingMood ? "Creating..." : "Create Mood"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Mood Dialog */}
            <Dialog open={isEditModalOpen} onOpenChange={toggleEditModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Mood</DialogTitle>
                        <DialogDescription>
                            Select the moods that best describe how you were feeling
                        </DialogDescription>
                    </DialogHeader>
                    {editError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                            {editError}
                        </div>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-4">
                        {moodTypes?.map((mood) => (
                            <Button
                                key={mood.id}
                                variant={selectedMoods.includes(mood.id.toString()) ? "default" : "outline"}
                                className="h-auto py-2"
                                onClick={() => toggleMoodSelection(mood.id.toString())}
                            >
                                <span className="mr-1 text-lg">{MOOD_EMOJIS[mood.name] || MOOD_EMOJIS.default}</span>
                                {mood.name}
                            </Button>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitEdit}
                            disabled={updatingMood || selectedMoods.length === 0}
                        >
                            {updatingMood ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <AlertModal
                open={isDeleteModalOpen}
                setOpen={toggleDeleteModal}
                title="Delete Mood Entry"
                description="Are you sure you want to delete this mood entry? This action cannot be undone."
                trigger={<span />}
            >
                {deleteError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {deleteError}
                    </div>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleSubmitDelete}
                        disabled={deletingMood}
                    >
                        {deletingMood ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </AlertModal>
        </div>
    );
} 