import { useEffect, useRef } from "react";

// Soft mouse-reactive gradient blob behind the hero.
export function MouseSpot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl transition-transform duration-100"
      style={{
        background:
          "radial-gradient(circle, var(--primary) 0%, transparent 60%)",
      }}
    />
  );
}
