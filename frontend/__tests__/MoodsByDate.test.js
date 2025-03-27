import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MoodsByDatePage from '../app/(main)/moods/[date]/page';
import { useRouter } from 'next/navigation';
import { useGetMoods, useGetMoodTypes, useUpdateMood, useDeleteMood } from '@/hooks/useMoods';
import { format } from 'date-fns';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

// Mock hooks
jest.mock('@/hooks/useMoods', () => ({
    useGetMoods: jest.fn(),
    useGetMoodTypes: jest.fn(),
    useUpdateMood: jest.fn(),
    useDeleteMood: jest.fn()
}));

describe('MoodsByDatePage', () => {
    const mockRouter = {
        push: jest.fn(),
        query: { date: '2023-05-15' }
    };

    const mockMoodEntries = [
        {
            mood_instance_id: 1,
            user_id: 1,
            created_at: '2023-05-15T10:00:00Z',
            user_moods: [
                { id: 101, mood_id: 1 },
                { id: 102, mood_id: 3 }
            ]
        },
        {
            mood_instance_id: 2,
            user_id: 1,
            created_at: '2023-05-15T14:30:00Z',
            user_moods: [
                { id: 103, mood_id: 2 }
            ]
        }
    ];

    const mockMoodTypes = [
        { id: 1, name: 'Happy' },
        { id: 2, name: 'Sad' },
        { id: 3, name: 'Anxious' }
    ];

    const mockGetMoods = jest.fn();
    const mockGetMoodTypes = jest.fn();
    const mockUpdateMood = jest.fn();
    const mockDeleteMood = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        useRouter.mockReturnValue(mockRouter);

        useGetMoods.mockReturnValue({
            data: mockMoodEntries,
            loading: false,
            error: null,
            getMoods: mockGetMoods
        });

        useGetMoodTypes.mockReturnValue({
            data: mockMoodTypes,
            loading: false,
            error: null,
            getMoodTypes: mockGetMoodTypes
        });

        useUpdateMood.mockReturnValue({
            updateMood: mockUpdateMood,
            loading: false,
            error: null
        });

        useDeleteMood.mockReturnValue({
            deleteMood: mockDeleteMood,
            loading: false,
            error: null
        });
    });

    test('renders mood entries for the specified date', async () => {
        render(<MoodsByDatePage params={{ date: '2023-05-15' }} />);

        // Check if API was called with correct date
        expect(mockGetMoods).toHaveBeenCalledWith('/moods/2023-05-15');

        // Check if mood entries are displayed
        await waitFor(() => {
            expect(screen.getByText('Moods for May 15, 2023')).toBeInTheDocument();
            expect(screen.getByText('10:00 am')).toBeInTheDocument();
            expect(screen.getByText('2:30 pm')).toBeInTheDocument();
            expect(screen.getByText('Happy')).toBeInTheDocument();
            expect(screen.getByText('Anxious')).toBeInTheDocument();
            expect(screen.getByText('Sad')).toBeInTheDocument();
        });
    });

    test('shows loading state when fetching mood entries', () => {
        useGetMoods.mockReturnValue({
            data: null,
            loading: true,
            error: null,
            getMoods: mockGetMoods
        });

        render(<MoodsByDatePage params={{ date: '2023-05-15' }} />);

        // We'd need to adapt this based on how your LoadingSpinner component works
        // This is just a placeholder test
        expect(document.querySelector('[role="status"]')).toBeInTheDocument();
    });

    test('handles date navigation correctly', async () => {
        render(<MoodsByDatePage params={{ date: '2023-05-15' }} />);

        // Test previous day navigation
        const prevButton = screen.getByRole('button', { name: /chevronleft/i });
        fireEvent.click(prevButton);

        expect(mockRouter.push).toHaveBeenCalledWith('/moods/2023-05-14');

        // Test next day navigation
        const nextButton = screen.getByRole('button', { name: /chevronright/i });
        fireEvent.click(nextButton);

        expect(mockRouter.push).toHaveBeenCalledWith('/moods/2023-05-16');
    });

    test('opens date picker when clicking on change date button', async () => {
        render(<MoodsByDatePage params={{ date: '2023-05-15' }} />);

        const changeDateButton = screen.getByRole('button', { name: /change date/i });
        fireEvent.click(changeDateButton);

        await waitFor(() => {
            expect(screen.getByText('Select a date')).toBeInTheDocument();
        });
    });

    test('shows edit dialog when clicking edit menu item', async () => {
        render(<MoodsByDatePage params={{ date: '2023-05-15' }} />);

        // Open dropdown menu for first mood entry
        const moreButtons = screen.getAllByRole('button', { name: /morevertical/i });
        fireEvent.click(moreButtons[0]);

        // Click edit option
        const editButton = screen.getByText('Edit');
        fireEvent.click(editButton);

        // Check if edit dialog appears
        await waitFor(() => {
            expect(screen.getByText('Edit Mood')).toBeInTheDocument();
        });
    });

    test('shows delete confirmation when clicking delete menu item', async () => {
        render(<MoodsByDatePage params={{ date: '2023-05-15' }} />);

        // Open dropdown menu for first mood entry
        const moreButtons = screen.getAllByRole('button', { name: /morevertical/i });
        fireEvent.click(moreButtons[0]);

        // Click delete option
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        // Check if delete confirmation dialog appears
        await waitFor(() => {
            expect(screen.getByText('Delete Mood Entry')).toBeInTheDocument();
            expect(screen.getByText('Are you sure you want to delete this mood entry? This action cannot be undone.')).toBeInTheDocument();
        });
    });
}); 