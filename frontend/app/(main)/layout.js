import Navbar from '@/components/navbar/Navbar';
// config.autoAddCss = false;

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen justify-between pb-16 bg-base-100">
          <div className="overflow-y-auto h-[calc(100vh-4rem)]">{children}</div>
          <Navbar />
        </div>
      </body>
    </html>
  );
}
