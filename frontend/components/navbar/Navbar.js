'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faComments,
  faHouse,
  faChartColumn,
  faGear
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const routes = [
    {
      name: 'Journals',
      path: '/journals',
      icon: faBook
    },
    {
      name: 'Chats',
      path: '/chats',
      icon: faComments
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: faHouse
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: faChartColumn
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: faGear
    }
  ];

  const currentPath = usePathname();

  // PLACEHOLDER
  const isLoggedIn = true;

  return (
    <div className="flex justify-evenly items-center bg-indigo-100 h-24">
      {routes.map((route) => (
        <Link
          className={`${currentPath === route.path ? 'text-purple-600' : 'text-gray-600'}
                transition ease-in-out duration-500 text-3xl`}
          href={isLoggedIn ? route.path : '/login'}
          key={route.name}>
          <FontAwesomeIcon icon={route.icon} />
        </Link>
      ))}
    </div>
  );
}
