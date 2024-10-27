// import Navbar from "@/components/navbar/Navbar";
// import { useRouter } from "next/router";
'use client'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
      <div className="flex flex-col min-h-screen">
        {/* <Navbar/> */}
        <header className="bg-primary text-white p-6">
          <h1 className="text-3xl font-bold">Welcome to your AI Journal</h1>
          <p className="mt-2">Your one-stop solution for awesome content!</p>
        </header>

        <main className="flex-grow p-6">
            <section>
            <h2 className="text-2xl font-semibold mb-4">Let's get journalling!</h2>
            <button className="btn btn-accent mr-4" onClick={() => router.push('/login')}>
              Log In
            </button>
            <button className="btn btn-accent" onClick={() => router.push('/register')}>
              Register
            </button>
          </section>

          <div className="card glass w-96 mt-8">
            <figure>
              <img
                src='/frontend/app/images/journalling-card.jpg'
                alt="journalling" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Journalling</h2>
              <p>Enjoy easily jotting down your thoughts and feelings using our user-friendly interface.</p>
            </div>
          </div>

          <div className="card glass w-96 mt-8">
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

          <div className="card glass w-96 mt-8">
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
        </main>

        <footer className="bg-secondary text-white p-6">
          <p>2024 GDSC McMaster.</p>
        </footer>
      </div>
  );
}
