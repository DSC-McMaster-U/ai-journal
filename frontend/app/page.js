// import Navbar from "@/components/navbar/Navbar";

export default function LandingPage() {
  return (
    <html data-theme="synthwave">
      <div className="flex flex-col min-h-screen">
        {/* <Navbar/> */}
        <header className="bg-primary text-black p-6">
          <h1 className="text-3xl font-bold">Hi to your AI Journal</h1>
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
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <button className="btn btn-accent">Log In</button>
          </section>

          <section>
            <button className="btn btn-accent">Sign Up</button>
          </section>
        </main>

        <footer className="bg-secondary text-white p-6">
          <p>2024 GDSC McMaster.</p>
        </footer>
      </div>
    </html>
  );
}
