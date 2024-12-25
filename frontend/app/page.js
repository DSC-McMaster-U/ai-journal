'use client';

import LandingCard from '@/components/landing/LandingCard';
import { Button } from '@/components/ui/button';
import { BookHeart, BotMessageSquare, Coffee, NotebookPen, Sticker } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative justify-center -z-20 flex-col min-h-screen bg-foreground overflow-x-hidden">
      <div className="absolute w-[1000px] h-[95vh] bg-background top-00 left-0 -z-10"></div>
      <header className="text-center min-h-screen flex flex-col rounded-b-[50px] bg-background">
        <h1 className="font-serif text-6xl font-light mt-16">Espressly</h1>
        <div className="flex-1 flex flex-col mb-2">
          <Image
            src="/images/espressly.png"
            alt="espressly logo"
            height="496"
            width="556"
            className="invert-[0.99] sepia-[0.23] saturate-[24.5] hue-rotate-[300deg] brightness-[1] contrast-[0.85] mt-auto"
          />
        </div>
        <div className="mt-auto">
          <h2 className="text-4xl font-serif font-light">Always Espresso Yourself!</h2>
          <h3 className="mx-auto text-muted mt-4 w-[80%]">
            Empower your well-being and unlock insights into your mental health
          </h3>

          <Button
            variant="secondary"
            className="w-[80%] text-lg font-bold rounded-full py-8 mb-[50px] mt-14 hover:-translate-y-1 transition-all"
            onClick={() => router.push('/register')}>
            Get Started!
          </Button>
        </div>
      </header>

      <main className="flex-grow text-background mt-14">
        <h2 className="text-5xl font-serif mt-4 mb-8 text-center">Features</h2>
        <div className="flex flex-col gap-14">
          <LandingCard
            title="Journalling"
            description="Enjoy easily jotting down your thoughts and feelings in your digital diary."
          />

          <LandingCard
            title="Mood Tracking"
            description="Log your mood to visualize patterns over time in your personalized mood graphs."
            alignment="right"
          />

          <LandingCard
            title="Guided Reflection"
            description="Level up your journalling game with AI-powered prompts and analysis."
          />

          <LandingCard
            title="AI Buddy"
            description="Chat with your friendly AI buddy and explore your thoughts together!"
            alignment="right"
          />
        </div>
      </main>

      <footer className="text-center p-4 mt-8 text-background">
        <p className="text-sm">Made with ❤️ by the Espressly Team © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
