// src/components/About.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

/* ─────────────────────────────────────────────
   Hook: 3D tilt on mouse-move (per-element)
───────────────────────────────────────────── */
function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
      el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02,1.02,1.02)`;
    },
    [strength],
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.1s ease-out";
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  return ref;
}

/* ─────────────────────────────────────────────
   Hook: scroll-driven reveal + 3D lift
───────────────────────────────────────────── */
function useScrollReveal(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Reusable: Reveal wrapper with stagger delay
───────────────────────────────────────────── */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "right";
}

function Reveal({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: RevealProps) {
  const { ref, visible } = useScrollReveal();

  const initial: Record<string, string> = {
    bottom: "translateY(56px) rotateX(8deg)",
    left: "translateX(-56px) rotateY(-8deg)",
    right: "translateX(56px) rotateY(8deg)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        perspective: "1200px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0) rotate(0)" : initial[from],
        transition: `opacity 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms,
                     transform 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Glowing Image Frame
───────────────────────────────────────────── */
function GlowFrame({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge?: { icon: string; label: string; sub: string };
}) {
  const tilt = useTilt(8);

  return (
    <div
      ref={tilt}
      className="relative"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* glow halo */}
      <div className="absolute -inset-3 rounded-3xl opacity-30 blur-2xl bg-gradient" />

      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <img src={src} alt={alt} className="w-full object-cover aspect-[4/3]" />
        {/* subtle overlay */}
        <div className="absolute inset-0 bg-gradient to-transparent" />
      </div>

      {badge && (
        <div
          className="absolute -bottom-4 left-6 flex items-center gap-3
                     bg-white/95 backdrop-blur-md border border-black/5
                     rounded-2xl px-4 py-2.5 shadow-xl"
          style={{ transform: "translateZ(30px)" }}
        >
          <span className="text-xl">{badge.icon}</span>
          <div>
            <p className="text-[10px] text-gray-400 font-medium leading-none">
              {badge.sub}
            </p>
            <p className="text-sm font-bold text-gray-800 leading-tight mt-0.5">
              {badge.label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const About = () => {
  const [activeTab, setActiveTab] = useState<"introduction" | "vision">(
    "introduction",
  );

  return (
    <section className="relative overflow-hidden py-10 ">
      {/* ── Ambient background blobs ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full
                        bg-indigo-200/30 blur-[100px]"
        />
        <div
          className="absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full
                        bg-cyan-200/25 blur-[100px]"
        />
        <div
          className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full
                        bg-violet-200/20 blur-[80px]"
        />
      </div>

      {/* ── Added px-4 sm:px-6 for mobile left/right breathing room ── */}
      <div className="relative container-custom px-4 sm:px-6 md:px-0">
        {/* ═══════════════════════════════════════
            SECTION 1 — ABOUT US
        ═══════════════════════════════════════ */}
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto py-1 pb-20 ">
          {/* Image */}
          <Reveal from="left">
            <GlowFrame
              src="https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/660568304_1533798112090377_8431089997376875323_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=dsatyNgJu2UQ7kNvwG6MD8m&_nc_oc=AdpHUFH0pwi30TfRg_vrdcD9MgV_pmlA3YlyBaEGpINy1D_XtiYQEi59A-Nq9PidgJv_mUvT7-1vkyO-3vl8M9zp&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=zJ9sdhMhEN4IUrku9DBxVg&_nc_ss=7a3a8&oh=00_Af1wlxNVE3rvrvnJfaHisAQixoUEME-v1FlNqogXSC8u9g&oe=69DBFE42"
              alt="School Building"
              badge={{ icon: "🏆", label: "#1 in Jhapa", sub: "Ranked" }}
            />
          </Reveal>

          {/* Text */}
          <Reveal from="right" delay={120}>
            <h2 className="heading-2">
              About <span className="text-secondary">Us</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Cornerstone Foundation Damak is a premier educational institution
              in Jhapa, Nepal, committed to holistic education that nurtures
              academic excellence, character development, and lifelong learning.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              We believe in{" "}
              <span className="font-semibold text-indigo-600">
                "Help me do it myself"
              </span>{" "}
              — empowering students to become independent thinkers and
              compassionate leaders. Our state-of-the-art campus features smart
              classrooms, science labs, sports facilities, and a vibrant
              learning environment.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                {
                  label: "Smart Classrooms",
                  color: "bg-indigo-50 text-indigo-700 border-indigo-100",
                },
                {
                  label: "Science Labs",
                  color: "bg-cyan-50 text-cyan-700 border-cyan-100",
                },
                {
                  label: "Sports Facilities",
                  color: "bg-amber-50 text-amber-700 border-amber-100",
                },
                {
                  label: "Arts & Culture",
                  color: "bg-emerald-50 text-emerald-700 border-emerald-100",
                },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${color}`}
                >
                  {label}
                </span>
              ))}
            </div>

            <button
              className="group inline-flex items-center gap-2 bg-secondary hover:bg-indigo-700
                               text-white font-semibold text-sm px-6 py-3 rounded-xl
                               shadow-lg shadow-indigo-300/40 hover:shadow-indigo-400/50
                               hover:-translate-y-0.5 active:scale-[.98]
                               transition-all duration-200"
            >
              Explore Campus
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </Reveal>
        </div>

        {/* ═══════════════════════════════════════
            SECTION 2 — VISION
        ═══════════════════════════════════════ */}
        <div className="bg-gray-100 ">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto py-16">
            {/* Text */}
            <Reveal from="left" delay={60}>
              <h2 className="heading-2">
                Vision &amp; <span className="text-secondary">Mission</span>
              </h2>

              {/* Tabs */}
              <div className="flex gap-2 bg-indigo-50  p-1.5 rounded-xl mb-6 w-fit">
                {(["introduction", "vision"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider
                              transition-all duration-250
                              ${
                                activeTab === t
                                  ? "bg-white text-secondary shadow-md shadow-indigo-100"
                                  : "text-indigo-400 hover:text-indigo-600"
                              }`}
                  >
                    {t === "introduction" ? "Introduction" : "Vision & Mission"}
                  </button>
                ))}
              </div>

              {/* Tab content — animated swap */}
              <div
                key={activeTab}
                className="text-gray-500 leading-relaxed space-y-3 mb-8
                         animate-[fadeSlideIn_0.35s_cubic-bezier(.16,1,.3,1)_both]"
              >
                {activeTab === "introduction" ? (
                  <>
                    <p>
                      Welcome to Cornerstone Foundation Damak — where young
                      minds blossom into future leaders. Established in 2005, we
                      have consistently delivered quality education with a
                      perfect blend of academics, sports, and values.
                    </p>
                    <p>
                      Our campus features experienced faculty and a curriculum
                      that encourages critical thinking, creativity, and
                      character development.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="font-semibold text-secondary">
                        Our Vision:
                      </span>
                      To be a center of excellence that empowers students to
                      become innovative, compassionate, and responsible global
                      citizens.
                    </p>
                    <p>
                      <span className="font-semibold text-secondary">
                        Our Mission:
                      </span>
                      To provide quality education through modern teaching
                      methodologies, foster holistic development, and create a
                      safe, inclusive environment where every student thrives.
                    </p>
                  </>
                )}
              </div>

              <button
                className="group inline-flex items-center gap-2 border-2 bg-secondary
                               text-white hover:bg-indigo-600 hover:text-white
                               font-semibold text-sm px-6 py-3 rounded-xl
                               hover:-translate-y-0.5 active:scale-[.98]
                               transition-all duration-200"
              >
                Read Full Story
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </button>
            </Reveal>

            {/* Image */}
            <Reveal from="right" delay={180}>
              <GlowFrame
                src="https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/663265873_1534636705339851_6012845490282456694_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=4h3LzR4Tzj8Q7kNvwGL1QFa&_nc_oc=AdrtqX8LPQTLXXQ-6U1GPVaiO9D9Q4jtUIYco82ZzeCK_Lc3RxT5pR9ohHM0NrerVEd0W3p2xISzoSovHbLOVPEk&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=WunmbPqaxFiZ1Q1r5sNrlg&_nc_ss=7a389&oh=00_Af07DV9YEAN19LqwD-nQjpY_YOi4b3KWI6bc3lwIKf5bPw&oe=69DC1717"
                alt="Vision"
                badge={{ icon: "🎓", label: "Since 2005", sub: "Established" }}
              />
            </Reveal>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            SECTION 3 — CHAIRPERSON
        ═══════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto py-10">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="heading-2">
                Message from <span className="text-secondary">Chairperson</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
            {/* Portrait card */}
            <Reveal from="left" delay={80}>
              <ChairpersonCard />
            </Reveal>

            {/* Quote card */}
            <Reveal from="right" delay={200}>
              <QuoteCard />
            </Reveal>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            STATS — 3D GRADIENT BAND
        ═══════════════════════════════════════ */}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Chairperson portrait card
───────────────────────────────────────────── */
function ChairpersonCard() {
  const tilt = useTilt(7);

  return (
    <div
      ref={tilt}
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
    >
      <img
        src="https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/661643980_1528514109285444_938418752789132_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd6889&_nc_ohc=n-fD__1hoVsQ7kNvwH1Y2_3&_nc_oc=AdrxAVwo5NAxDjdeB0NGufcV-KgowfFMYXavX-Kv1PV9Vjz1Z2seVNkLpjVS1ozKdyEZWC_IG7jB31p1sGiHE-Ye&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=eBKZISmhp9CkXBiIdx5UWg&_nc_ss=7a3a8&oh=00_Af223QtT04AlYjw6J9KNevQaO-WEFHfEK7bR1tSg0IfqxA&oe=69DC0692"
        alt="Chairperson"
        className="w-full object-cover aspect-[3/4]"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-800/50  " />

      {/* name */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white font-bold text-lg leading-tight">
          Mr. Rajendra Sharma
        </p>
        <p className="text-indigo-300 text-sm font-medium mt-0.5">
          Chairperson &amp; Founder
        </p>

        {/* socials */}
        <div className="flex gap-2.5 mt-4">
          {[
            { Icon: FaFacebook, href: "#" },
            { Icon: FaTwitter, href: "#" },
            { Icon: FaInstagram, href: "#" },
            { Icon: FaLinkedin, href: "#" },
            { Icon: FaYoutube, href: "#" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="flex items-center justify-center h-8 w-8 rounded-full
                         bg-white/15 hover:bg-white/30 border border-white/20
                         text-white transition-all duration-200 hover:scale-110"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Quote card
───────────────────────────────────────────── */
function QuoteCard() {
  const tilt = useTilt(5);

  return (
    <div
      ref={tilt}
      className="relative bg-white rounded-2xl border border-gray-100
                 shadow-xl shadow-gray-100/80 p-8 md:p-10 overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* giant decorative quote */}
      <span
        className="absolute -top-4 -left-1 text-[9rem] leading-none text-indigo-100
                       font-serif select-none pointer-events-none"
        aria-hidden
      >
        "
      </span>

      <div className="relative space-y-3 text-gray-500 leading-relaxed text-[15px]">
        <p>Dear Students, Parents, and Well-wishers,</p>
        <p>
          It is my immense pleasure to welcome you to Cornerstone Foundation
          Damak. Our journey began in 2005 with a simple yet powerful belief:
          every child has innate potential waiting to be nurtured.
        </p>
        <p>
          Over the years, we have grown into a family of{" "}
          <span className="font-semibold text-secondary">
            over 1,200 students
          </span>
          and{" "}
          <span className="font-semibold text-secondary">
            85 dedicated teachers
          </span>
          , all working together to create a vibrant learning community.
        </p>
        <p>
          We believe in the Montessori philosophy —{" "}
          <span className="font-semibold text-[#ff4217]">
            "Help me do it myself"
          </span>
          . Our approach fosters independence, curiosity, and respect for
          others.
        </p>
        <p>
          I invite you to visit our campus and experience the Cornerstone
          difference. Together, let's build a brighter future for our children.
        </p>
      </div>

      {/* Signature */}
      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient" />
        <div>
          <p className="font-bold text-gray-900 text-sm">Mr. Rajendra Sharma</p>
          <p className="text-gray-400 text-xs mt-0.5">
            Chairperson, Cornerstone Foundation Damak
          </p>
        </div>
      </div>

      <div className="mt-6">
        <button
          className="group inline-flex items-center gap-2 bg-secondary hover:bg-indigo-700
                           text-white font-semibold text-sm px-5 py-2.5 rounded-xl
                           shadow-md shadow-indigo-300/40 hover:-translate-y-0.5 active:scale-[.98]
                           transition-all duration-200"
        >
          See More
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export default About;
