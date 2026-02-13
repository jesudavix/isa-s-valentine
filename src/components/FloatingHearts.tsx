import { useEffect, useRef } from "react";

const FloatingHearts = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hearts = ["♥", "♡", "❤", "💕"];
    const container = containerRef.current;
    if (!container) return;

    const createHeart = () => {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 14 + 10 + "px";
      heart.style.animationDuration = Math.random() * 8 + 10 + "s";
      heart.style.animationDelay = Math.random() * 2 + "s";
      container.appendChild(heart);

      setTimeout(() => heart.remove(), 18000);
    };

    // Create initial hearts
    for (let i = 0; i < 8; i++) {
      setTimeout(createHeart, i * 600);
    }

    const interval = setInterval(createHeart, 2500);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
};

export default FloatingHearts;
