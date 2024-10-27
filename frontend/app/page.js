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
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Get Journalling</h2>
            <button className="btn btn-accent" onClick={() => router.push('/login')}>
              Log In
            </button>
            <button className="btn btn-accent" onClick={() => router.push('/register')}>
              Register
            </button>
          </section>
        </main>

        <footer className="bg-secondary text-white p-6">
          <p>2024 GDSC McMaster.</p>
        </footer>
      </div>
  );
}
