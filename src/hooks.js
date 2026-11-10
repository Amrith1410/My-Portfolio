import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Adds `.in` to every `.reveal` element as it scrolls into view. */
export function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      // threshold 0: fire as soon as any part enters, so very tall cards on phones don't sit blank
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** True once the referenced element has been on screen. */
export function useInView(options = { threshold: 0.25 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, seen];
}

/** Eases a number from `from` to `to` once `play` turns true. */
export function useCount(to, play, { from = 0, duration = 1600 } = {}) {
  const [n, setN] = useState(prefersReducedMotion() ? to : from);
  useEffect(() => {
    if (!play) return undefined;
    if (prefersReducedMotion()) {
      setN(to);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setN(Math.round(from + (to - from) * eased));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [play, to, from, duration]);
  return n;
}

/** Types and deletes through a list of phrases, forever. */
export function useTypewriter(phrases, { type = 55, erase = 28, hold = 1500 } = {}) {
  const [text, setText] = useState(prefersReducedMotion() ? phrases[0] : "");
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let i = 0;
    let n = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const word = phrases[i];
      if (!deleting) {
        n += 1;
        setText(word.slice(0, n));
        if (n === word.length) {
          deleting = true;
          timer = setTimeout(tick, hold);
          return;
        }
        timer = setTimeout(tick, type + Math.random() * 35);
      } else {
        n -= 1;
        setText(word.slice(0, n));
        if (n === 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, erase);
      }
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return text;
}

/** Which section id is currently under the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}
