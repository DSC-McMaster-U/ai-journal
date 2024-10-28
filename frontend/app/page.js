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
        <header className="text-center p-6">
          <h1 className="text-primary text-8xl font-bold mt-12">Your AI Journal</h1>
          <p className="mt-2">Empower your well-being: document your thoughts, track your mood, and unlock insights into your mental health</p>
        </header>

        <main className="flex-grow p-6">
        <section className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Let's get journalling!</h2>
            <button className="btn btn-primary mr-4" onClick={() => router.push('/login')}>
              Log In
            </button>
            <button className="btn btn-primary" onClick={() => router.push('/register')}>
              Register
            </button>
        </section>

          <h2 className="text-2xl font-semibold mb-2 text-center">Features</h2>
          {/* <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card glass w-96 mt-2 bg-primary">
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

            <div className="card glass w-96 mt-2 bg-primary">
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

            <div className="card glass w-96 mt-2 bg-primary">
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
          </div> */}

          <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
            <div className="carousel-item">
              <div className="card glass w-96 mt-2 bg-primary">
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
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                className="rounded-box" />
            </div>
          </div>
        </main>
      </div>
  );
}
