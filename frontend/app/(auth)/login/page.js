'use client';

import { permanentRedirect, useSearchParams } from 'next/navigation';
import { useAuthentication } from '@/hooks/authentication';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  //const params = useSearchParams();
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

  return <div>LoginPage: {GoogleOAuthButton()}</div>;
}

function GoogleOAuthButton() {
  return <a href="http://localhost:8080/api/auth">Log in using Google</a>;
}
