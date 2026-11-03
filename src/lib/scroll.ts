import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/** Jump to a section by id, through the smoother when it is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(el, true, "top top");
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Current scroll position, smoothed or native. */
export function getScrollY() {
  const smoother = ScrollSmoother.get();
  return smoother ? smoother.scrollTop() : window.scrollY;
}
