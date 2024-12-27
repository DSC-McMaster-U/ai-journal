import Navbar from '@/components/common/Navbar';
import { Toaster } from '@/components/ui/toaster';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen justify-between pb-16 bg-base-100">
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">{children}</div>
      <Navbar />
    </div>
  );
}
