import { useState, useRef, useEffect, useCallback } from "react";
import { Heart, Music, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import { useHeartExplosion } from "@/hooks/useHeartExplosion";
import photo1 from "@/assets/photo1.jpeg";
import photo2 from "@/assets/photo2.jpeg";
import photo3 from "@/assets/photo3.jpeg";
import photo4 from "@/assets/photo4.jpeg";

const photos = [photo1, photo2, photo3, photo4];

const Index = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const questionRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const explode = useHeartExplosion();

  // Scroll fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".scroll-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((p) => (p + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToQuestion = () => {
    questionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnswer = (intense: boolean) => {
    explode(intense ? 40 : 20);
    setAnswered(true);
  };

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      // Use a simple tone as placeholder — user can replace with real audio
      audioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2024/11/29/audio_d27dcc6722.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  }, [musicPlaying]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <FloatingHearts />

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        className={`fixed top-6 right-6 z-50 rounded-full bg-primary/10 p-3 backdrop-blur-sm transition-all hover:bg-primary/20 ${musicPlaying ? "music-playing" : ""}`}
        aria-label="Toggle music"
      >
        {musicPlaying ? (
          <Volume2 className="h-5 w-5 text-primary" />
        ) : (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 font-serif text-7xl font-bold tracking-tight text-primary sm:text-8xl md:text-9xl animate-fade-in">
          Isa <span className="inline-block animate-pulse">❤️</span>
        </h1>
        <p className="mb-10 max-w-md font-serif text-xl italic text-muted-foreground sm:text-2xl animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
          Desde que llegaste, todo es más bonito.
        </p>
        <button
          onClick={scrollToQuestion}
          className="group rounded-full border-2 border-primary bg-primary/5 px-8 py-4 font-sans text-base font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground sm:text-lg animate-fade-in"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          Tengo algo importante que preguntarte...
          <Heart className="ml-2 inline-block h-4 w-4 transition-transform group-hover:scale-125" />
        </button>
      </section>

      {/* Middle Section - Message + Gallery */}
      <section className="relative z-10 bg-secondary/30 px-6 py-20">
        <div className="scroll-fade mx-auto max-w-lg text-center mb-16">
          <Heart className="mx-auto mb-6 h-8 w-8 text-primary/40" />
          <p className="font-serif text-2xl leading-relaxed text-foreground/80 sm:text-3xl">
            Cada momento contigo es especial.
          </p>
          <p className="mt-4 font-serif text-xl leading-relaxed text-foreground/60 sm:text-2xl">
            Me haces sonreír incluso en los días difíciles.
          </p>
          <p className="mt-4 font-serif text-xl leading-relaxed text-foreground/60 sm:text-2xl">
            Contigo todo tiene más sentido.
          </p>
          <Heart className="mx-auto mt-6 h-8 w-8 text-primary/40" />
        </div>

        {/* Photo Carousel */}
        <div className="scroll-fade mx-auto max-w-md">
          <h3 className="mb-6 text-center font-serif text-2xl text-primary/70">Nuestros momentos 💕</h3>
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentPhoto * 100}%)` }}
            >
              {photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Nosotros ${i + 1}`}
                  className="w-full flex-shrink-0 object-cover aspect-[4/5]"
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 backdrop-blur-sm transition-all hover:bg-background"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => setCurrentPhoto((p) => (p + 1) % photos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 backdrop-blur-sm transition-all hover:bg-background"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPhoto(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${i === currentPhoto ? "bg-primary scale-110" : "bg-primary/30"}`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Question Section */}
      <section
        ref={questionRef}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center"
      >
        {!answered ? (
          <div className="scroll-fade">
            <h2 className="mb-12 font-serif text-4xl font-bold text-primary sm:text-5xl md:text-6xl">
              ¿Quieres ser mi San Valentín?
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <button
                onClick={() => handleAnswer(false)}
                className="rounded-full bg-primary px-10 py-4 font-sans text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Sí 💕
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="rounded-full border-2 border-primary bg-primary/10 px-10 py-4 font-sans text-lg font-semibold text-primary transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
              >
                Obvio sí 😍
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h2 className="mb-4 font-serif text-5xl font-bold text-primary sm:text-6xl md:text-7xl">
              Sabía que dirías que sí
            </h2>
            <p className="text-6xl">❤️</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
