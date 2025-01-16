'use client';

import { useAuthentication } from '@/hooks/authentication';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Lock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

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
    <div className="flex flex-col h-screen items-center">
      <h1 className="font-serif text-6xl font-light mt-16">Espressly</h1>
      <div className="bg-foreground w-screen h-[78%] rounded-t-[50px] mt-auto flex flex-col text-background p-8">
        <Image src="/images/huggingcoffee.svg" alt="espressly logo" height="768" width="1024" />
        <h2 className="text-2xl font-medium">Sign In</h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="bg-muted-foreground rounded-full p-2">
            <User className="stroke-border" size={24} />
          </div>
          <Input className="text-base border-2 py-4" type="email" placeholder="Email" />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="bg-muted-foreground rounded-full p-2">
            <Lock className="stroke-border" size={24} />
          </div>
          <Input className="text-base border-2 py-4" type="password" placeholder="Password" />
        </div>
        <Button
          variant="secondary"
          size="lg"
          className="mt-4 text-base rounded-full py-5"
          onClick={() => {
            toast({
              title: 'Sorry!',
              description: 'Email sign in is not available yet.'
            });
          }}>
          Sign In
        </Button>
        <Link href="http://localhost:8080/api/auth" className="mt-4 block w-full">
          <Button className="py-5 bg-foreground border-secondary border-2 text-base rounded-full w-full">
            <FcGoogle className="!w-6 !h-6" /> Sign In with Google
          </Button>
        </Link>
      </div>
    </div>
  );
}
