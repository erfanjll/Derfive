import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[100svh] flex-col justify-center py-32">
      <p className="label-mono mb-6">
        <span className="text-signal">404</span> — Level not found
      </p>
      <h1 className="font-display text-[clamp(3rem,12vw,12rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-bone">
        Nothing
        <br />
        <span className="outline-text">here.</span>
      </h1>
      <p className="mt-8 max-w-md text-fog">This page doesn't exist — or hasn't been built yet. Either way, the way back is below.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/" magnetic>Back home</Button>
        <Link href="/projects" className="self-center font-mono text-xs uppercase tracking-[0.16em] text-mist hover:text-signal">
          or see the projects
        </Link>
      </div>
    </section>
  );
}
