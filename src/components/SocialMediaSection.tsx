import { useEffect, useState } from 'react';
import type { SocialPost } from '../types';
import { FaFacebook, FaTiktok, FaExternalLinkAlt } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Generate 16 dummy posts (mix of Facebook & TikTok)
const generateDummyPosts = (): SocialPost[] => {
  const platforms = ['facebook', 'tiktok'] as const;
  
  // Text-only captions (removed the long URLs)
  const captions = [
    "Our annual sports day was a huge success! Students showcased amazing talent and teamwork. 🏆 #SportsDay",
    "Science exhibition 2024 - young minds presenting innovative projects. Proud of our future scientists! 🔬",
    "Celebrating International Literacy Day with book donation drive. Thank you to all volunteers! 📚",
    "Dance performance by our students at the annual function 🎭 #SchoolEvent",
    "Behind the scenes: Robotics club preparing for national competition 🤖 #STEM",
    "Morning assembly vibes - discipline, dedication, and determination 💪",
    "Art competition winners! So much creativity in our students 🎨",
    "Field trip to the science museum – learning beyond classrooms 🚌",
    "Yoga session for mental wellness and focus 🧘‍♀️",
    "Parent-teacher meeting – building strong partnerships 🤝",
    "Independence Day celebration with patriotic fervor 🇳🇵",
    "Computer lab session – coding for future innovators 💻",
    "Library week – reading champions rewarded 📖",
    "Environment club planting trees on campus 🌳",
    "Inter-school debate competition – our team won! 🎤",
    "Annual prize distribution ceremony – celebrating excellence 🏅"
  ];

  // Unique image URLs extracted from your original captions array
  const images = [
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/497504578_2990929554419082_6238939522070073813_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f798df&_nc_ohc=Ap1_OoA4EnIQ7kNvwE7-eBU&_nc_oc=AdrQwD5gT9ejJPf_n6C62K45cGl83n7fOtu6-JSu9QT5VGVYBU4XmPRcGJL6bmmaeHzNF6qygWs71hZCV3i_q79S&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=aLa2JcZgnMizcAF5YhZYgA&_nc_ss=7a3a8&oh=00_Af3E1Ki07_9Iy8_cruWhrkMPzeWJZW5-iFKqs28wP0trCQ&oe=69DD4A78",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/497406316_2990929684419069_5811374946701209914_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f798df&_nc_ohc=sQ_gyEI6i5gQ7kNvwE51-IZ&_nc_oc=AdrsW8wNOHts-JqgInkbeqoNeW6mFIsXRIycua2upcQVbxRZRzbw-sh8FneiVnEMhhJPxGo98ooLpT4AHPCrjlCP&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=8xp9OLTR8w_Mp92GHpoYCg&_nc_ss=7a3a8&oh=00_Af2ntimaLcpglPTYyCIc9Ob3P0XvaLVjEGJW2fVQGZn6lw&oe=69DD2F40",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/497714743_2990929664419071_9011197472914436257_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f798df&_nc_ohc=-hTMNrhlkwcQ7kNvwGbXjC7&_nc_oc=AdqOcwLa7sZFIjxQ5Lpf8R2b1RUZlpOvQ1TjWTObGx2ZWhJYZKutmMEh2ognp-tv1qlH3B1vQmzSKR8vDADeZ6XD&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=oMGrBAGvowpvtMoNHM0jQA&_nc_ss=7a3a8&oh=00_Af02AFEgs4XoFDNlxSJiZ4pYygJ2OpE45mifw0Pn5M3Xew&oe=69DD5FF9",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/498634216_1249148327222025_2596121155852788973_n.jpg?stp=cp6_dst-jpg_s552x414_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_ohc=lBEoF4ipXosQ7kNvwGeXFEQ&_nc_oc=AdpbrGbmHfoM0kYanjyRlgEUVVTSPaWl7cTdFGuWiE7gcicgWQzQYIRZykWdUyhZGy8fK1DOt5ZX_50wMqAYs3GX&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=KkSKCiVhFuKNMDS3h7vcbQ&_nc_ss=7a3a8&oh=00_Af2UbRmFKbo8anLchsLL7PeOjN5oH8VbAy5FXuADvPeMSQ&oe=69DD50D9",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/499036888_1249148157222042_3962928665252871462_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=dd6889&_nc_ohc=6o_4L73p8zcQ7kNvwHNO77K&_nc_oc=AdreaClVr_OMxbBfdyz8f3xcfJGiU6Rl50sjP3E1mYNexekpMlUJHtJxSb6nGUM0w3a0PdM6Lp2JsBlHC4XTI6vy&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=utmAJ0qZV9hQmkF2bI6PWQ&_nc_ss=7a3a8&oh=00_Af0G1BMSHnMNPcP0Z8gTwhhhhsUtyKjXh6UyZci526vDqw&oe=69DD3BA1",
    "https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/498601227_1249148307222027_8657810592046149640_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=dd6889&_nc_ohc=2nVtzrbg9LAQ7kNvwFxgc1O&_nc_oc=AdpllrXbCHNnxfX1XHDmaytbYm-E19vLJHItPS4IL0_hXNwBELiBywOYI2lcTwoxydnfVbF4g-UuRlKqV1dBK6Nx&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=8R0ueBOchjUpubeRyD0Pig&_nc_ss=7a3a8&oh=00_Af09QOa7PZrLHlXqRB-EUp11iFC2o4qQcG5-mGS3hEzVkw&oe=69DD32AC"
  ];

  return Array.from({ length: 16 }, (_, i) => ({
    id: `dummy-${i}`,
    platform: platforms[i % 2],
    thumbnail: images[i % images.length],
    caption: captions[i % captions.length],
    link: platforms[i % 2] === 'facebook' 
      ? 'https://facebook.com/csfdamak' 
      : 'https://tiktok.com/@cornerstone_foundation',
    createdAt: new Date(Date.now() - i * 86400000).toISOString()
  }));
};

const SocialMediaSection = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(generateDummyPosts());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getPlatformIcon = (platform: string) => {
    return platform === 'facebook' ? (
      <FaFacebook className="text-blue-600" />
    ) : (
      <FaTiktok className="text-black" />
    );
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <h2 className="heading-2" data-aos="fade-up" data-aos-duration="600">Latest from Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md" data-aos="fade-up" data-aos-delay={`${i * 100}`} data-aos-duration="500">
                <Skeleton height={200} />
                <div className="p-4">
                  <Skeleton count={2} />
                  <Skeleton width="60%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="heading-2" data-aos="fade-up" data-aos-duration="600">Latest from Social Media</h2>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No posts available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="700">
            {posts.slice(0, 6).map((post, i) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                data-aos="zoom-in"
                data-aos-delay={`${100 + i * 75}`}
                data-aos-duration="600"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt="Post thumbnail"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md">
                    {getPlatformIcon(post.platform)}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 line-clamp-3 mb-3">
                    {post.caption.length > 120 ? post.caption.substring(0, 120) + '...' : post.caption}
                  </p>
                  <div className="flex justify-between items-center text-sm text-secondary">
                    <span className="font-medium">View on {post.platform}</span>
                    <FaExternalLinkAlt size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <a
            href="https://facebook.com/csfdamak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="600"
          >
            Follow us on Social Media <FaFacebook /> <FaTiktok />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
