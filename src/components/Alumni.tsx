import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  twitter: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "आशा खरेल",
    role: "cardiologist",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQst6EHEx-x2hVsz7FrTrxXXNPTSehT817dCA&s",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },

  {
    name: "आशा श्रेष्ठ",
    role: "surgeon",
    image:
      "https://www.nepalminute.com/uploads/posts/Dr%20Toshima%20Karki1665806173.JPG",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },
    {
    name: "आशा खरेल",
    role: "cardiologist",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQst6EHEx-x2hVsz7FrTrxXXNPTSehT817dCA&s",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },

  {
    name: "आशा श्रेष्ठ",
    role: "surgeon",
    image:
      "https://www.nepalminute.com/uploads/posts/Dr%20Toshima%20Karki1665806173.JPG",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },
    {
    name: "आशा खरेल",
    role: "cardiologist",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQst6EHEx-x2hVsz7FrTrxXXNPTSehT817dCA&s",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },

  {
    name: "आशा श्रेष्ठ",
    role: "surgeon",
    image:
      "https://www.nepalminute.com/uploads/posts/Dr%20Toshima%20Karki1665806173.JPG",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },
    {
    name: "आशा खरेल",
    role: "cardiologist",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQst6EHEx-x2hVsz7FrTrxXXNPTSehT817dCA&s",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },

  {
    name: "आशा श्रेष्ठ",
    role: "surgeon",
    image:
      "https://www.nepalminute.com/uploads/posts/Dr%20Toshima%20Karki1665806173.JPG",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },
    {
    name: "आशा खरेल",
    role: "cardiologist",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQst6EHEx-x2hVsz7FrTrxXXNPTSehT817dCA&s",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },

  {
    name: "आशा श्रेष्ठ",
    role: "surgeon",
    image:
      "https://www.nepalminute.com/uploads/posts/Dr%20Toshima%20Karki1665806173.JPG",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },
    {
    name: "आशा खरेल",
    role: "cardiologist",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQst6EHEx-x2hVsz7FrTrxXXNPTSehT817dCA&s",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },

  {
    name: "आशा श्रेष्ठ",
    role: "surgeon",
    image:
      "https://www.nepalminute.com/uploads/posts/Dr%20Toshima%20Karki1665806173.JPG",
    bio: "doctor",
    linkedin: "#",
    twitter: "#",
  },
];

const LinkedInIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Alumni: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-10">
        <style>{`
        .team-swiper .swiper-pagination-bullet {
          background-color: #d1d5db;
          opacity: 1;
          width: 7px;
          height: 7px;
          transition: all 0.3s;
        }
        .team-swiper .swiper-pagination-bullet-active {
          background-color: #1a3a5c;
          width: 22px;
          border-radius: 4px;
        }
        .team-swiper {
          padding-bottom: 52px !important;
        }
        .team-card-img {
          transition: transform 0.4s ease;
        }
        .team-card:hover .team-card-img {
          transform: scale(1.05);
        }
      `}</style>

        <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
          {/* Header row */}

          <div
            className="text-center mb-12"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
              Proud Alumni
            </h2>
          </div>

          {/* Swiper */}
          <Swiper
            className="team-swiper"
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper: SwiperType) => {
              const nav = swiper.params.navigation;
              if (nav && typeof nav === "object") {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
            }}
            breakpoints={{
              540: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {teamMembers.map((member, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div
                  className="team-card group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
                  data-aos="fade-up"
                  data-aos-delay={`${i * 100}`}
                  data-aos-duration="600"
                >
                  {/* Image with hover overlay */}
                  <div className="relative overflow-hidden bg-gray-50 h-56">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-card-img w-full h-full object-cover rounded-2xl p-4 group-hover:scale-105 transition-transform duration-400"
                    />
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <a
                        href={member.linkedin}
                        className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon />
                      </a>
                      <a
                        href={member.twitter}
                        className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                        aria-label="Twitter"
                      >
                        <TwitterIcon />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 text-center">
                    <div className="mb-3">
                      <h3 className="text-2xl font-semibold text-primary leading-snug">
                        {member.name}
                      </h3>
                      <span className="text-lg font-medium text-secondary tracking-wide uppercase mt-0.5 block">
                        {member.role}
                      </span>
                    </div>

                    <p className="text-lg text-gray-500 leading-relaxed flex-1">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Alumni;
