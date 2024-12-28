'use client';
import Navbar from '@/components/common/Navbar';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const isJournalDetail = /^\/journals\/[^/]+\/[^/]+$/.test(pathname);

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
