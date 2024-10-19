import Navbar from '@/components/navbar/Navbar'

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className='min-h-screen flex flex-col justify-between'>
          {children}
          <Navbar />
        </div>
      </body>
    </html>
  );
}