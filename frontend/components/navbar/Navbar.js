'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const routes = [
        {
            name: 'Journals',
            path: '/journals',
        },
        {
            name: 'Chats',
            path: '/chats',
        },
        {
            name: 'Dashboard',
            path: '/dashboard',
        },
        {
            name: 'Stats',
            path: '/stats',
        },
        {
            name: 'Settings',
            path: '/settings',
        },
    ];

    const currentPath = usePathname();

    // PLACEHOLDER
    const isLoggedIn = true;

    return (
      <div className="flex justify-evenly items-center bg-indigo-100 h-24">
        {routes.map((route) => (
            <Link className={
                `${currentPath === route.path ? 'text-purple-600' : 'text-gray-600'}
                transition ease-in-out duration-500`
            } href={isLoggedIn ? route.path : '/login'} key={route.name}>{route.name}</Link>
        ))}
      </div>
    );
}