"use client";

import { useState, useEffect } from "react";

export default function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === text) {
      // Pause at the end before deleting
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      // Pause before typing again
      timer = setTimeout(() => setIsDeleting(false), 500);
    } else {
      // Typing or deleting speed
      const timeout = isDeleting ? 50 : 150;
      timer = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length + (isDeleting ? -1 : 1)));
      }, timeout);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text]);

  return (
    <span className="inline-flex items-center min-h-[1.2em]">
      <span>{displayText || '\u200B'}</span>
      <span className="animate-pulse ml-1 text-primary">|</span>
    </span>
  );
}
