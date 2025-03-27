'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function MoodsPage() {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        // Only redirect if we haven't started redirecting yet
        if (!isRedirecting) {
            setIsRedirecting(true);

            // Get today's date in YYYY-MM-DD format
            const today = format(new Date(), 'yyyy-MM-dd');

            // Use router.push instead of replace for more reliable navigation
            router.push(`/moods/${today}`);
        }
    }, [router, isRedirecting]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <LoadingSpinner />
        </div>
    );
} 