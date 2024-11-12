'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaBook, FaChartColumn, FaComment, FaGear, FaHouse } from 'react-icons/fa6';

export default function Navbar() {
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

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-evenly items-center h-16 p-0 m-0 bg-neutral z[2]">
      {routes.map((route) => (
        <Link
          className={`${currentPath === route.path ? 'text-primary' : 'text-neutral-content'}
                transition ease-in-out duration-500 text-3xl cursor-pointer`}
          href={isLoggedIn ? route.path : '/login'}
          key={route.name}>
          {route.icon}
        </Link>
      ))}
    </div>
  );
}
