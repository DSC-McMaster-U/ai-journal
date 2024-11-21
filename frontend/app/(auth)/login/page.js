'use client';

import { useAuthentication } from '@/hooks/authentication';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  useAuthentication(
    () => {
      console.log('Successful authentication!');
      router.push('/dashboard');
    },
    () => {
      console.log('User is not authenticated');
    },
    []
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="card card-bordered bg-neutral w-[80%] flex flex-col items-center mb-20 p-6">
        <h1 className="text-2xl font-light tracking-wider mb-8">Sign In Using Google</h1>
        <Link href="http://localhost:8080/api/auth" className="mt-auto">
          <button className="btn btn-wide btn-outline text-lg flex items-center gap-2">
            <FcGoogle /> Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
