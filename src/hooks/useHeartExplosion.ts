import { useCallback } from "react";

export const useHeartExplosion = () => {
  const explode = useCallback((intensity: number = 20) => {
    const hearts = ["❤️", "💕", "💖", "💗", "💓", "💘", "♥️"];
    const container = document.body;

    for (let i = 0; i < intensity; i++) {
      const heart = document.createElement("span");
      heart.className = "explode-heart";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      heart.style.left = centerX + "px";
      heart.style.top = centerY + "px";

      const angle = (Math.PI * 2 * i) / intensity + (Math.random() - 0.5) * 0.5;
      const distance = 100 + Math.random() * 250;
      heart.style.setProperty("--tx", Math.cos(angle) * distance + "px");
      heart.style.setProperty("--ty", Math.sin(angle) * distance - 100 + "px");
      heart.style.fontSize = Math.random() * 20 + 16 + "px";
      heart.style.animationDelay = Math.random() * 0.3 + "s";

      container.appendChild(heart);
      setTimeout(() => heart.remove(), 1600);
    }
  }, []);

  return explode;
};
