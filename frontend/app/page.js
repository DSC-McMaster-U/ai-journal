'use client'

import Navbar from "@/components/navbar/Navbar";
// import { useRouter } from "next/router";
import Link from 'next/link'
import {useRouter} from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
      <div className="flex justify-center flex-col min-h-screen">
        <Navbar/>
        <header className="bg-primary text-white text-center p-6">
          <h1 className="text-3xl font-bold">Welcome to your AI Journal</h1>
          <p className="mt-2">Empower your well-being: document your thoughts, track your mood, and unlock insights into your mental health</p>
        </header>

        <main className="flex-grow p-6">
        <section className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Let's get journalling!</h2>
            <button className="btn btn-accent mr-4" onClick={() => router.push('/login')}>
              Log In
            </button>
            <button className="btn btn-accent" onClick={() => router.push('/register')}>
              Register
            </button>
        </section>

          <h2 className="text-2xl font-semibold mb-4 text-center">Features</h2>
          <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card glass w-96 mt-8 bg-primary">
            <figure>
              <img
                src='ai-journal\frontend\app\images\journalling-card.jpg' // not working.
                alt="journalling" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Journalling</h2>
              <p>Enjoy easily jotting down your thoughts and feelings using our user-friendly interface.</p>
            </div>
          </div>

          <div className="card glass w-96 mt-8 bg-primary">
            <figure>
              <img
                src='/frontend/app/images/journalling-card.jpg'
                alt="journalling" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Mood Tracking</h2>
              <p>Visualize patterns in your mood over time through personalized graphs.</p>
            </div>
          </div>

          <div className="card glass w-96 mt-8 bg-primary">
            <figure>
              <img
                src='/frontend/app/images/journalling-card.jpg'
                alt="journalling" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">AI Buddy</h2>
              <p>Level up your journalling game with AI-assisted custom prompts and analysis.</p>
            </div>
          </div>
          </div>
        </main>
      </div>
  );
}
