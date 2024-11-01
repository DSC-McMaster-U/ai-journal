'use client'

import Navbar from "@/components/navbar/Navbar";
import {useRouter} from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="justify-center flex-col min-h-screen bg-indigo-100">
      <Navbar/>
      <header className="text-center p-6">
        <h1 className="text-primary text-8xl font-bold mt-12">AI Journal</h1>
        <p className="mt-2 ml-40 mr-40 text-gray-600">Empower your well-being and unlock insights into your mental health with your AJ Journal.</p>
      </header>

      <main className="flex-grow p-6">
        <section className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Let's get journalling!</h2>
            <button className="btn bg-purple-600 text-white mr-4 shadow-l" onClick={() => router.push('/login')}>
              Log In
            </button>
            <button className="btn bg-purple-600 text-white shadow-l" onClick={() => router.push('/register')}>
              Register
            </button>
        </section>

        <h2 className="text-gray-800 text-3xl font-semibold mt-10 mb-2 text-center">Features</h2>
        <div className="flex justify-center mr-20 ml-20">
            <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4 mr-20 ml-20">
              <div className="card lg:card-side mt-2 bg-white shadow-xl">
                <div className="card-body text-gray-600">
                    <h2 className="card-title text-primary">Journalling</h2>
                    <p>Enjoy easily jotting down your thoughts and feelings using our user-friendly journal interface.</p>
                </div>
              </div>

              <div className="card lg:card-side mt-2 bg-white shadow-xl">
                <div className="card-body text-gray-600">
                  <h2 className="card-title text-primary">Mood Tracking</h2>
                  <p>Log your mood to visualize patterns over time in your personalized mood graphs.</p>
                </div>
              </div>

              <div className="card lg:card-side mt-2 bg-white shadow-xl">
                <div className="card-body text-gray-600">
                  <h2 className="card-title text-primary">Guided Reflection</h2>
                  <p>Level up your journalling game with AI-powered custom prompts and analysis.</p>
                </div>
              </div>

              <div className="card lg:card-side mt-2 bg-white shadow-xl">
                <div className="card-body text-gray-600">
                  <h2 className="card-title text-primary">AI Buddy</h2>
                  <p>Chat with your friendly AI buddy and explore your thoughts together!</p>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}
