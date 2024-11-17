'use client';

import { permanentRedirect, useSearchParams } from 'next/navigation';
import { useAuthentication } from '@/hooks/authentication';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

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
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-purple-blue">
      <h1 className="text-7xl font-bold text-primary mt-20">Login Page</h1>
      <div className="mt-auto mb-80">
        <GoogleOAuthButton />
      </div>
    </div>
  );
}

function GoogleOAuthButton() {
  return (
    <a href="http://localhost:8080/api/auth">
      <button className="btn btn-primary flex items-center gap-2 btn-xs sm:btn-sm md:btn-md lg:btn-lg">
        <FaGoogle /> Log in using Google
      </button>
    </a>
  );
}