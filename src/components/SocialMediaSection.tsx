import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  authorInitials: string;
  category: string;
  thumbnail: string;
  link: string;
  publishedAt: string;
  readTime: string;
}

const generateDummyPosts = (): BlogPost[] => {
  const posts = [
    {
      title: "Annual Sports Day 2024: Talent, Teamwork & Triumph",
      subtitle: "A day students will remember forever",
      description:
        "Students from all grades came together in a spectacular display of athleticism and school spirit, featuring track events, team sports, and a closing ceremony.",
      author: "Priya Sharma",
      authorInitials: "PS",
      category: "Events",
      readTime: "3 min read",
    },
    {
      title: "Science Exhibition 2024: Young Minds, Big Ideas",
      subtitle: "Our students are building tomorrow",
      description:
        "From solar-powered models to AI experiments, this year's science exhibition pushed boundaries and left parents and judges genuinely impressed.",
      author: "Rohan Thapa",
      authorInitials: "RT",
      category: "STEM",
      readTime: "4 min read",
    },
    {
      title: "Literacy Day: 500 Books Donated to Community",
      subtitle: "Reading opens doors — we opened many",
      description:
        "In partnership with local libraries, our students organised a heartfelt book donation drive reaching over 200 families across the district.",
      author: "Anita Rai",
      authorInitials: "AR",
      category: "Community",
      readTime: "2 min read",
    },
    {
      title: "Annual Function: An Evening of Art & Performance",
      subtitle: "Where students become storytellers",
      description:
        "The auditorium came alive with dance, drama, and music as students took center stage at this year's most anticipated school event.",
      author: "Meena Gurung",
      authorInitials: "MG",
      category: "Arts",
      readTime: "3 min read",
    },
    {
      title: "Robotics Club Heads to Nationals",
      subtitle: "Gears, code, and determination",
      description:
        "After weeks of late-night practice sessions, our robotics team has qualified for the national competition. Meet the students building our future.",
      author: "Rohan Thapa",
      authorInitials: "RT",
      category: "STEM",
      readTime: "5 min read",
    },
    {
      title: "How Morning Assembly Shapes Our School Culture",
      subtitle: "Discipline starts at 7am",
      description:
        "A look at how our daily assembly ritual — recitation, reflection, and announcements — builds the habits and values that define life at our school.",
      author: "Anita Rai",
      authorInitials: "AR",
      category: "School Life",
      readTime: "2 min read",
    },
  ];

  const images = [
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/497504578_2990929554419082_6238939522070073813_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f798df&_nc_ohc=Ap1_OoA4EnIQ7kNvwE7-eBU&_nc_oc=AdrQwD5gT9ejJPf_n6C62K45cGl83n7fOtu6-JSu9QT5VGVYBU4XmPRcGJL6bmmaeHzNF6qygWs71hZCV3i_q79S&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=aLa2JcZgnMizcAF5YhZYgA&_nc_ss=7a3a8&oh=00_Af3E1Ki07_9Iy8_cruWhrkMPzeWJZW5-iFKqs28wP0trCQ&oe=69DD4A78",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/497406316_2990929684419069_5811374946701209914_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f798df&_nc_ohc=sQ_gyEI6i5gQ7kNvwE51-IZ&_nc_oc=AdrsW8wNOHts-JqgInkbeqoNeW6mFIsXRIycua2upcQVbxRZRzbw-sh8FneiVnEMhhJPxGo98ooLpT4AHPCrjlCP&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=8xp9OLTR8w_Mp92GHpoYCg&_nc_ss=7a3a8&oh=00_Af2ntimaLcpglPTYyCIc9Ob3P0XvaLVjEGJW2fVQGZn6lw&oe=69DD2F40",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/497714743_2990929664419071_9011197472914436257_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f798df&_nc_ohc=-hTMNrhlkwcQ7kNvwGbXjC7&_nc_oc=AdqOcwLa7sZFIjxQ5Lpf8R2b1RUZlpOvQ1TjWTObGx2ZWhJYZKutmMEh2ognp-tv1qlH3B1vQmzSKR8vDADeZ6XD&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=oMGrBAGvowpvtMoNHM0jQA&_nc_ss=7a3a8&oh=00_Af02AFEgs4XoFDNlxSJiZ4pYygJ2OpE45mifw0Pn5M3Xew&oe=69DD5FF9",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/498634216_1249148327222025_2596121155852788973_n.jpg?stp=cp6_dst-jpg_s552x414_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_ohc=lBEoF4ipXosQ7kNvwGeXFEQ&_nc_oc=AdpbrGbmHfoM0kYanjyRlgEUVVTSPaWl7cTdFGuWiE7gcicgWQzQYIRZykWdUyhZGy8fK1DOt5ZX_50wMqAYs3GX&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=KkSKCiVhFuKNMDS3h7vcbQ&_nc_ss=7a3a8&oh=00_Af2UbRmFKbo8anLchsLL7PeOjN5oH8VbAy5FXuADvPeMSQ&oe=69DD50D9",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/499036888_1249148157222042_3962928665252871462_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=dd6889&_nc_ohc=6o_4L73p8zcQ7kNvwHNO77K&_nc_oc=AdreaClVr_OMxbBfdyz8f3xcfJGiU6Rl50sjP3E1mYNexekpMlUJHtJxSb6nGUM0w3a0PdM6Lp2JsBlHC4XTI6vy&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=utmAJ0qZV9hQmkF2bI6PWQ&_nc_ss=7a3a8&oh=00_Af0G1BMSHnMNPcP0Z8gTwhhhhsUtyKjXh6UyZci526vDqw&oe=69DD3BA1",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/498601227_1249148307222027_8657810592046149640_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=dd6889&_nc_ohc=2nVtzrbg9LAQ7kNvwFxgc1O&_nc_oc=AdpllrXbCHNnxfX1XHDmaytbYm-E19vLJHItPS4IL0_hXNwBELiBywOYI2lcTwoxydnfVbF4g-UuRlKqV1dBK6Nx&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=8R0ueBOchjUpubeRyD0Pig&_nc_ss=7a3a8&oh=00_Af09QOa7PZrLHlXqRB-EUp11iFC2o4qQcG5-mGS3hEzVkw&oe=69DD32AC",
  ];

  return posts.map((p, i) => ({
    id: `post-${i}`,
    ...p,
    thumbnail: images[i % images.length],
    link:
      "/blog/" +
      p.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
  }));
};

const SocialMediaSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(generateDummyPosts());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading) {
    return (
      <section className="py-12">
        <div className="container-custom">
          <div className="text-center mb-10">
            <Skeleton width={120} height={12} className="mb-2" />
            <Skeleton width={220} height={32} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden border border-gray-100"
              >
                <Skeleton height={190} />
                <div className="p-5">
                  <Skeleton width="30%" height={12} className="mb-3" />
                  <Skeleton height={18} className="mb-1" />
                  <Skeleton width="70%" height={14} className="mb-3" />
                  <Skeleton count={2} height={13} />
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                    <Skeleton width={100} height={12} />
                    <Skeleton width={80} height={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="container-custom">
        {/* Header */}
        <div
          className="text-center mb-10"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">
            School updates
          </p>
          <h2 className="heading-2 ">Our blogs</h2>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No posts available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 6).map((post, i) => (
              <a
                key={post.id}
                href={post.link}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                data-aos="fade-up"
                data-aos-delay={`${i * 80}`}
                data-aos-duration="600"
              >
                {/* Cover image */}
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Category tag */}
                  <div className="mb-3">
                    <span className="text-[12px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-500 border border-gray-200">
                      {post.category}
                    </span>
                  </div>

                  {/* Title + subtitle */}
                  <h3 className="text-xl font-bold text-primary mb-3 leading-tight line-clamp-2 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-[12.5px] italic text-gray-600 mb-2">
                    {post.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-md text-gray-900 leading-tight line-clamp-2 mb-4">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium flex items-center justify-center flex-shrink-0">
                        {post.authorInitials}
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {post.author}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {formatDate(post.publishedAt)} · {post.readTime}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          className="text-center mt-10"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            View all posts →
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
