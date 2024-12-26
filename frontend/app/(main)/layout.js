import Navbar from '@/components/navbar/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen justify-between pb-16 bg-base-100">
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">{children}</div>
      <Navbar />
    </div>
  );
}
