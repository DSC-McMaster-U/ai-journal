'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaBook, FaChartColumn, FaComment, FaGear, FaHouse } from 'react-icons/fa6';

export default function Navbar({ isSidebarOpen }) {
  const routes = [
    {
      name: 'Journals',
      path: '/journals',
      icon: <FaBook />
    },
    {
      name: 'Chats',
      path: '/chats',
      icon: <FaComment />
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <FaHouse />
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: <FaChartColumn />
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <FaGear />
    }
  ];

  const currentPath = usePathname();

  // PLACEHOLDER
  const isLoggedIn = true;

  // Hide navbar when sidebar is open
  if (isSidebarOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-evenly items-center h-16 p-0 m-0 bg-[#1e293b] border-t border-base-content/10 z-[2]">
      {routes.map((route) => (
        <Link
          className={`${currentPath === route.path
              ? 'text-primary'
              : 'text-gray-400 hover:text-primary'
            } transition ease-in-out duration-500 text-2xl cursor-pointer`}
          href={isLoggedIn ? route.path : '/login'}
          key={route.name}>
          {route.icon}
        </Link>
      ))}
    </div>
  );
}