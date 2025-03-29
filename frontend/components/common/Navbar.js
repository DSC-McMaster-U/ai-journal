'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { House, MessageSquare, Notebook, Settings, Smile, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar({ isSidebarOpen }) {
  const routes = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <House strokeWidth={2} size={22} />
    },
    {
      name: 'Journals',
      path: '/journals',
      icon: <Notebook strokeWidth={2} size={22} />
    },
    {
      name: 'Chats',
      path: '/chats',
      icon: <MessageSquare strokeWidth={2} size={22} />
    },
    {
      name: 'Moods',
      path: '/moods',
      icon: <Smile strokeWidth={2} size={22} />
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <User strokeWidth={2} size={22} />
    }
  ];

  const currentPath = usePathname();

  // PLACEHOLDER
  const isLoggedIn = true;

  // Hide navbar when sidebar is open
  if (isSidebarOpen) return null;

  return (
    // <div className="fixed bottom-0 left-0 w-full flex justify-between px-8 items-center h-20 p-0 m-0 bg-accent z-[2]">
    //   {routes.map((route) => (
    //     <Link
    //       className={cn(
    //         'transition ease-in-out duration-500 cursor-pointer flex flex-col items-center gap-2',
    //         currentPath === route.path ? 'text-primary' : 'text-muted-foreground/50'
    //       )}
    //       href={isLoggedIn ? route.path : '/login'}
    //       key={route.name}>
    //       {route.icon}
    //       <p className={cn('text-xs')}>{route.name}</p>
    //     </Link>
    //   ))}
    // </div>
    <div className="fixed bottom-0 left-0 w-full flex justify-evenly items-center h-16 p-0 m-0 bg-accent z-[2]">
      {routes.map((route) => (
        <Link
          className={cn(
            'transition ease-in-out duration-500 cursor-pointer flex flex-col items-center gap-2 p-3 rounded-lg',
            !currentPath.startsWith(route.path) && 'hover:bg-primary/10',
            currentPath.startsWith(route.path) ? 'bg-primary text-background' : 'text-primary/70'
          )}
          href={isLoggedIn ? route.path : '/login'}
          key={route.name}>
          {route.icon}
        </Link>
      ))}
    </div>
  );
}
