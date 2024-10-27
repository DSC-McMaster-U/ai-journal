import Navbar from '@/components/navbar/Navbar'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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