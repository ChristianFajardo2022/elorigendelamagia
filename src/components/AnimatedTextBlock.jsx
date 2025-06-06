import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export function AnimatedTextBlock({
  text,
  progress,    // entre 0 y 1
  className = "",
  align = "left",
  stagger = 0.03,   // separación en tiempo entre letras
  blur = 18
}) {
  const blockRef = useRef();

  useEffect(() => {
    const lines = blockRef.current.querySelectorAll(".line");
    lines.forEach(line => {
      const spans = line.querySelectorAll("span.letter");
      spans.forEach((span, i) => {
        const delay = i * stagger;
        const prog = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
        gsap.to(span, {
          opacity: prog,
          scale: prog,
          filter: `blur(${(1 - prog) * blur}px)`,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
  }, [progress, stagger, blur]);

  // Permite saltos de línea en el string
  const lines = text.split("\n");

  return (
    <div
      ref={blockRef}
      className={`inline-block whitespace-pre-wrap ${className}`}
      style={{ textAlign: align }}
    >
      {lines.map((line, idx) => (
        <div key={idx} className="line">
          {[...line].map((char, i) => (
            <span
              key={i}
              className="letter inline-block"
              style={{
                opacity: 0,
                filter: `blur(${blur}px)`,
                scale: 0,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
