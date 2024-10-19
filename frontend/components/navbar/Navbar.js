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

    // PLACEHOLDER
    const isLoggedIn = true;

    return (
      <div className="flex justify-evenly">
        {routes.map((route) => (
            <Link href={isLoggedIn ? route.path : '/login'} key={route.name}>{route.name}</Link>
        ))}
      </div>
    );
}