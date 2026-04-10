// src/components/Hero.tsx
import { useState, useEffect, useRef } from "react";

const slides = [
  {
    image:
      "https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/658139956_1528513312618857_5681677191566449512_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd6889&_nc_ohc=YVXddKpO9owQ7kNvwFHuTEA&_nc_oc=AdpWR6YK2M43sU4zpUr6cpKQecnqa0EyNVoAJg_GRo0jB80Qheer7p8zffj27zD13RKfw_DaFV_qQ45MVVmBK6Wh&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=rWZgyXFZUlX8I5tlfnMI8A&_nc_ss=7a3a8&oh=00_Af36AQpBBPj4f9CObUnb5Ig_qmaGto1jLKSP7WX4MjHQFQ&oe=69DC256E",
    title: "Welcome to Cornerstone Foundation Damak",
  },
  {
    image:
      "https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/659772071_1528510945952427_6505606609695925360_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd6889&_nc_ohc=qJgnhLb0kWMQ7kNvwF_gNDu&_nc_oc=Adrxro9XQDbcmFBiZYbv9sI7tMm8ZnXjHZfWScjApJezpvapMDsdsY0s2Aji9h5C9krIgjLlv0mi3B1RZL7sR-KL&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=cJCio4wmaxukbBUmtFBT_Q&_nc_ss=7a3a8&oh=00_Af3KLQ0t-5KAQa8sMyQIMiMM6Cy-ntC4B_1x2Mck1YWsmQ&oe=69DBF5EF",
    title: "Excellence in Education — Empowering Students",
  },
  {
    image:
      "https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/658985447_1528510872619101_6630655861344239799_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd6889&_nc_ohc=mJgr1MN2haAQ7kNvwFFKnjA&_nc_oc=AdrJn8fZh3m4ZV3bhG-wu3bnu3azq0BGdjFrEdBiJirjcx0beWLZIm9bPz-xpz5sRXNhQju5P_vgcDCfhQAe1gRa&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=ooqn527Rzcnlt2F8OrqBpg&_nc_ss=7a3a8&oh=00_Af3bTtK1j37jFkrChbMT6gzQHjLVEZr9UMuOIQJRyPOOyw&oe=69DC2727",
    title: "State-of-the-Art Facilities & Modern Labs",
  },
  {
    image:
      "https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/496097364_1244241267712731_2073615263628998097_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=dd6889&_nc_ohc=kmSQ5I8MPl0Q7kNvwE0AGWh&_nc_oc=Adq28sHybgpZ5AGENJbGI18ERN5F-uiZfSR7siQammVZ_SvDWeoS6mWHSpsk8UP6XT_OgJpvuVVMKI6SUBDVS8EF&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=kQ7c6cbtJlOvsVsdljfM6A&_nc_ss=7a3a8&oh=00_Af3u0EEcpmTHx7O5cv2p-4D2PKhhKTBYkKxrbCxF7PQoMw&oe=69DC2022",
    title: "Celebrating Academic & Extracurricular Success",
  },
  {
    image:
      "https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/496095427_1244241171046074_6331536110647945490_n.jpg?stp=dst-jpg_s417x417_tt6&_nc_cat=107&ccb=1-7&_nc_sid=dd6889&_nc_ohc=hu-nFR7Z-5YQ7kNvwFtDS-g&_nc_oc=AdqNwATyjGsg-lb3bIxy1FED_HWvNixsmYOvsm7eLNDvFoe0Js3bHNMkjzCXnpb4Mc60gkmNXUdVLOBfENAIbILj&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=70sMGF2FyYOaao2Eoim_xQ&_nc_ss=7a3a8&oh=00_Af3zq2CRl4h7ZmeowVd8MqB1Td88cp4l3q5apiGiBepG0w&oe=69DC0006",
    title: "राष्ट्रिय सेवा दल — हाम्रा गौरवशाली विद्यार्थीहरू",
  },
];

const DURATION = 2500; // ms per slide
const TICK = 30; // progress bar update interval ms

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [zoomed, setZoomed] = useState(true);
  const progressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startCycle = (idx: number) => {
    // Clear existing timers
    if (progressRef.current) clearInterval(progressRef.current);
    if (slideRef.current) clearTimeout(slideRef.current);

    setProgress(0);
    setZoomed(true);

    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += TICK;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, TICK);

    slideRef.current = setTimeout(() => {
      const next = (idx + 1) % slides.length;
      setZoomed(false);
      setTimeout(() => {
        setCurrent(next);
        startCycle(next);
      }, 300);
    }, DURATION);
  };

  useEffect(() => {
    startCycle(0);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (slideRef.current) clearTimeout(slideRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setZoomed(false);
    setTimeout(() => {
      setCurrent(idx);
      startCycle(idx);
    }, 300);
  };

  return (
    <section className="relative w-full overflow-hidden h-[70vh] max-h-[600px] min-h-[450px] md:h-[600px]">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Blurred overlay image */}
          <img
            src={slide.image}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.2, transform: "scale(1)" }}
          />

          {/* Main image with zoom animation */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: idx === current && zoomed ? "scale(1.08)" : "scale(1)",
              transition:
                idx === current
                  ? "transform 5.5s ease-out"
                  : "transform 0.3s ease-in",
            }}
          />
        </div>
      ))}

      {/* Bottom-left text panel — exactly like Oxford */}
      <div
        className="absolute z-20 hidden md:flex items-center"
        style={{
          background: "#2442b2",
          left: 0,
          bottom: "15%",
          width: "55%",
          padding: "1.5rem",
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
          boxShadow: "4px 4px 0 white",
          minHeight: "64px",
        }}
      >
        <p className="text-white font-bold text-[1.5rem] leading-snug">
          {slides[current].title}
        </p>
      </div>

      {/* Mobile text — centered */}
      <div className="absolute inset-0 z-20 flex md:hidden items-end justify-center pb-16 px-4">
        <div
          className="text-white font-bold text-xl text-center px-4 py-3 rounded-xl"
          style={{ background: "rgba(26,58,92,0.85)" }}
        >
          {slides[current].title}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? "w-6 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Progress bar at bottom — exactly like Oxford */}
      <div
        className="absolute bottom-0 left-0 w-full z-30"
        style={{ height: "5px", background: "#ccc" }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#1a3a5c",
            transition: `width ${TICK}ms linear`,
          }}
        />
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
