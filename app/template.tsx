import { PageTransition } from "@/components/layout/PageTransition";

/** Runs on every navigation — wraps each page in the dark wipe transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
