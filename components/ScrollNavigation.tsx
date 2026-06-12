"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const routes = [
  "/",
  "/about",
  "/skills",
  "/projects",
  "/terminal",
  "/experience"
];

// Helper to check if the scroll event occurred inside a nested scrollable element
const isInsideScrollable = (target: HTMLElement | null, deltaY: number): boolean => {
  let el = target;
  while (el && el !== document.body && el !== document.documentElement) {
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    const isScrollable = overflowY === "auto" || overflowY === "scroll";
    
    if (isScrollable && el.scrollHeight > el.clientHeight) {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;
      
      if (deltaY > 0) {
        // Scrolling down: if we can scroll down further inside this container, let it scroll
        if (scrollTop + clientHeight < scrollHeight - 2) {
          return true;
        }
      } else {
        // Scrolling up: if we can scroll up further inside this container, let it scroll
        if (scrollTop > 2) {
          return true;
        }
      }
    }
    el = el.parentElement;
  }
  return false;
};

export default function ScrollNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioning = useRef(false);
  const lastTransitionTime = useRef(0);
  const touchStartY = useRef(0);

  // Release transitioning lock when pathname changes
  useEffect(() => {
    isTransitioning.current = false;
  }, [pathname]);

  useEffect(() => {
    const isAtBottom = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      // If the page itself is not scrollable, it is always at bottom
      if (scrollHeight <= clientHeight + 10) return true;
      return scrollTop + clientHeight >= scrollHeight - 10;
    };

    const isAtTop = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return scrollTop <= 10;
    };

    const navigate = (direction: number) => {
      const currentIndex = routes.indexOf(pathname);
      if (currentIndex === -1) return;

      const nextIndex = currentIndex + direction;
      if (nextIndex >= 0 && nextIndex < routes.length) {
        isTransitioning.current = true;
        lastTransitionTime.current = Date.now();
        router.push(routes[nextIndex]);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // If transitioning or in the cooldown, ignore
      if (isTransitioning.current) return;
      const now = Date.now();
      if (now - lastTransitionTime.current < 1000) return;

      const deltaY = e.deltaY;
      // Filter out minor mouse/trackpad scrolls
      if (Math.abs(deltaY) < 30) return;

      // Check if we are scrolling inside a nested scrollable element (like Terminal)
      if (isInsideScrollable(e.target as HTMLElement, deltaY)) {
        return;
      }

      if (deltaY > 0) {
        if (isAtBottom()) {
          navigate(1);
        }
      } else {
        if (isAtTop()) {
          navigate(-1);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning.current) return;
      const now = Date.now();
      if (now - lastTransitionTime.current < 1000) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY; // Positive = swiping up (scrolling down)

      if (Math.abs(deltaY) < 50) return; // Threshold for swipe

      if (isInsideScrollable(e.target as HTMLElement, deltaY)) {
        return;
      }

      if (deltaY > 0) {
        if (isAtBottom()) {
          navigate(1);
        }
      } else {
        if (isAtTop()) {
          navigate(-1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;
      const now = Date.now();
      if (now - lastTransitionTime.current < 1000) return;

      // Ignore key events when the user is typing in form fields or inputs
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (isAtBottom()) {
          e.preventDefault();
          navigate(1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (isAtTop()) {
          e.preventDefault();
          navigate(-1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname, router]);

  return null;
}
