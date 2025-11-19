import { useMemo } from "react";

export default function useStarfield(count = 90) {
  return useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = Math.random() * 2 + 0.6;

      return {
        id: i,
        left,
        top,
        size,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 6
      };
    });
  }, [count]);
}
