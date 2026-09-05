"use client";

import { useEffect, useState } from "react";

/** Returns true when the CSS media query matches. Always false on the server. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export const useIsFinePointer = () => useMediaQuery("(pointer: fine)");
