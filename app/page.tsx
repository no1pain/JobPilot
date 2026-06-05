export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500">
        Coming soon
      </p>
      <h1 className="mb-4 text-5xl font-bold tracking-tight">JobPilot</h1>
      <p className="mb-8 max-w-md text-lg text-zinc-400">
        Your smart companion for job hunting — track applications, prep for
        interviews, and land your next role faster.
      </p>
      <ul className="space-y-2 text-sm text-zinc-500">
        <li>Organize applications in one place</li>
        <li>Get reminders before deadlines</li>
        <li>Practice with AI-powered interview prep</li>
      </ul>
    </main>
  );
}
