// useScrollLock.js
import { useCallback } from "react";

export function useScrollLock() {
  const lockScroll = useCallback(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    document.documentElement.style.overflow = "";
  }, []);

  return { lockScroll, unlockScroll };
}
