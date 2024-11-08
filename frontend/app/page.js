'use client';

import LandingCard from '@/components/landing/LandingCard';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="justify-center flex-col min-h-screen">
      <header className="relative text-center min-h-screen grid justify-center items-center overflow-hidden">
        <div className="absolute top-0 left-0 inset-0 flex justify-center items-center -z-10">
          <p className="text-justify text-white opacity-[0.4] blur-[5px] select-none mask-gradient">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio explicabo quaerat esse,
            provident tempore vel quos iste cumque quisquam recusandae ut ipsum? Quae vel fugiat
            maxime quaerat qui minima ut exercitationem, libero vero doloremque molestias assumenda
            facilis aspernatur eius obcaecati sint sed odit quos laborum voluptas optio sequi
            nesciunt dolore accusamus. Magnam, cum. Quam, neque veniam. Voluptatem reiciendis soluta
            ipsa quas nesciunt facilis, sequi deleniti repudiandae fuga sit dolorum natus blanditiis
            optio quibusdam iste ut debitis quisquam dolor beatae eveniet explicabo, temporibus
            quae. Libero deserunt dolorem nemo quos, voluptates illum nisi tempore dolores?
            Accusantium quia modi fugiat. Quidem aliquam illum nobis harum a! Saepe voluptas unde
            aliquam sint consectetur ipsa delectus dolorem expedita accusamus molestiae officiis
            voluptatem, minima ex nemo? Rerum repudiandae suscipit ab, quasi nemo ducimus vero quis
            facilis non vitae, sint sed officia laudantium ad excepturi modi enim. Atque quam
            impedit eos fugit in earum et consequuntur at laudantium, asperiores ab illo unde
            necessitatibus ducimus eius architecto, hic laborum labore quis? Autem at veritatis
            velit sapiente porro modi ea quis, officiis exercitationem vel, in fugiat dolorum hic
            odit cumque ad accusantium ipsam, qui reiciendis doloremque quas explicabo. Veritatis
            perferendis eos exercitationem commodi distinctio maiores aspernatur aperiam ea
            voluptatibus, laboriosam numquam omnis eligendi sapiente quidem magni nulla sed saepe.
            Voluptate voluptatibus quod reiciendis dignissimos nobis, quam, praesentium enim rem
            perferendis id expedita similique deserunt excepturi. Ipsam dolore totam praesentium
            nesciunt, officiis a deserunt, nihil obcaecati autem recusandae nemo quidem nisi
            adipisci dolor laborum quos doloremque ducimus nulla delectus molestias alias quas
            voluptatum. Fugit expedita enim id deleniti illum quia porro ut. Iure suscipit eum ut
            accusamus voluptas temporibus ea illo magnam nobis repellendus, modi eveniet sapiente
            aspernatur facere non quod porro dolorum doloribus natus fuga, vel est quae! Ducimus
            incidunt nam deserunt. Voluptate temporibus molestiae, veniam quod nisi blanditiis,
            nesciunt commodi perspiciatis asperiores veritatis sit excepturi quis sapiente sunt?
            Reiciendis saepe assumenda delectus ipsa odit quam mollitia explicabo exercitationem
            cumque? Maiores accusantium tempora iure
          </p>
        </div>

        <div>
          <h1 className="text-primary text-6xl font-bold">AI Journal</h1>
          <p className="mt-2 mx-4 text-lg">
            Empower your well-being and unlock insights into your mental health with your AJ Journal
          </p>

          <section className="text-center mt-16">
            <h2 className="text-2xl font-semibold mb-4">Let&apos;s get journalling!</h2>
            <div className="flex justify-center gap-4 mx-4">
              <button className="btn btn-primary flex-1" onClick={() => router.push('/login')}>
                Log In
              </button>
              <button className="btn btn-primary flex-1" onClick={() => router.push('/register')}>
                Register
              </button>
            </div>
          </section>
        </div>
      </header>

      <main className="flex-grow p-6 border-t-4 border-neutral">
        <h2 className="text-3xl font-semibold mt-4 mb-2 text-center">Features</h2>
        <div className="flex justify-center">
          <div className="grid gap-4">
            <LandingCard
              title="Journalling"
              description="Enjoy easily jotting down your thoughts and feelings using our user-friendly journal interface."
            />

            <LandingCard
              title="Mood Tracking"
              description="Log your mood to visualize patterns over time in your personalized mood graphs."
            />

            <LandingCard
              title="Guided Reflection"
              description="Level up your journalling game with AI-powered custom prompts and analysis."
            />

            <LandingCard
              title="AI Buddy"
              description="Chat with your friendly AI buddy and explore your thoughts together!"
            />
          </div>
        </div>
      </main>

      <footer className="text-center p-4 mt-4">
        <p className="text-sm">Made with ❤️ by the AJ Team © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
