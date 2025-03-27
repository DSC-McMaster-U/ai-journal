'use client';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Navbar from '@/components/common/Navbar';
import { useAuthentication } from '@/hooks/authentication';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  const isJournalDetail = /^\/journals\/[^/]+\/[^/]+$/.test(pathname);

  useAuthentication(
    (user) => {
      setUser(user);
    },
    () => {
      router.push('/login');
    }
  );

  if (user == undefined) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen justify-between pb-16 bg-base-100">
      <div
        className={`overflow-y-auto ${
          isJournalDetail ? 'h-[calc(100vh-161px)]' : 'h-[calc(100vh-4rem)]'
        }`}>
        {children}
      </div>
      <Navbar />
    </div>
  );
}
