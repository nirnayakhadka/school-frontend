import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { GalleryImage } from '../types';

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images: GalleryImage[] = [
    { id: 1, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/495747989_2986475794864458_1750049641344253592_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f798df&_nc_ohc=xOPtnD_6Bf0Q7kNvwHa_AuI&_nc_oc=Adrg71YosaKGXbTHIsdZT2fOWhcgydDewC-5V7h3fYKFwXS58wWpg-9P7OZTiwxnKDZH5meuNXu7Lh8ZsUPbzVYo&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=MVns5lIcAFeUbBXUzDGA4g&_nc_ss=7a3a8&oh=00_Af23ntSOBajtRbdqMK-iVQPJ2QesgHPejsHk6dcBw8WbDg&oe=69DD593C', title: 'class view', category: 'class' },
    { id: 2, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/496151639_2986475851531119_945933471413896128_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f798df&_nc_ohc=vD5-30FORDUQ7kNvwFW_wox&_nc_oc=AdozdRKq7c8dPQYMxivLAq46yYJhtw5qKWXufva0pKCSllQPfmlXz_gzo0fsl85FKdR0FLjOYzWcnxYs7xY4wet5&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=34Yd-nPoNtlAgv06aGD32Q&_nc_ss=7a3a8&oh=00_Af2A33tNkUzsf6X5LddDQHumw7h5QDhwcbvSx8G7jWssDA&oe=69DD366C', title: 'Normal Day', category: 'Events' },
    { id: 3, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t1.6435-9/85062344_1447174658794587_3925756406698868736_n.jpg?stp=dst-jpg_s417x417_tt6&_nc_cat=100&ccb=1-7&_nc_sid=f798df&_nc_ohc=EeqhTTEP76MQ7kNvwFZFqHn&_nc_oc=AdqxFx_AWMEQIlIciHfR58ImIcO3H8uIKzt8BDk3wrByVUV-OpL45wMzy91s_kocGmNj91_R2t1d2mgTx3mg4E0m&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=p2cMGFynxSJDKHaxGWhQMw&_nc_ss=7a3a8&oh=00_Af0ezoFNDveLXa7-o8TColmur9vLOZKCN778Qt4BG_DDzA&oe=69FEE68A', title: 'Science Lab', category: 'Facilities' },
    { id: 4, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/481478331_1182077600595765_7874600434045822921_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd6889&_nc_ohc=AzdF95Et_qkQ7kNvwE6qUaH&_nc_oc=AdpUHBDRSvtowuEMEPnVgwjFvnh27ZbSfOH2H3OQGObwuawdZLPlVXlAWhW0YoFLHno7EC4mjHAEUzmSxWRASL66&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=FeEZCAQIgmtyAy65qQ2ZPQ&_nc_ss=7a3a8&oh=00_Af24porhSX-ebx8yBM82C9qFQE9ksKrk_g9mN9_GOONC7w&oe=69DD290B', title: 'Annual Function', category: 'Events' },
    { id: 5, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/495593423_2986475618197809_190522612439279219_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=f798df&_nc_ohc=J4_JvLxaOz4Q7kNvwECTnDt&_nc_oc=AdpSeF4mnOpbQeSaoLZwkvWL9s5MtK_69tDC9pMZdlJmDABSu5T_BYHa_dcf33NS3Ku7d5eNYLMAj_00GxGyO2qo&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=8EADTS_BYy8CJY4Q8HxkMA&_nc_ss=7a3a8&oh=00_Af2eOAae8QiPbr3h3PLjJ5TSJZ7vO5rmrktDyFW5IEQrBw&oe=69DD4E2A', title: 'Library', category: 'Facilities' },
    { id: 6, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/495594029_2986475874864450_8038949786784529742_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f798df&_nc_ohc=h8waHW5ESLEQ7kNvwHkw26p&_nc_oc=AdrbZkmYCEYEVyAJMfJ3YUYr_gZfZnC9hbIe3jGysNZYCfeYGd9016odFVgPuxrZ92FXT5ROBKLwcyDGwJrNBm6F&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=FKGScoIQRhNvlRuh1X5eIg&_nc_ss=7a3a8&oh=00_Af31q_wCWub2-8UaMSybf-e4cZmmsIl2GAPNdOZztOyAbA&oe=69DD3CBE', title: 'Classroom', category: 'Academics' },
    { id: 7, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/496857826_2986475994864438_4319414660415393099_n.jpg?stp=dst-jpg_s417x417_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f798df&_nc_ohc=2tlAezA6j-EQ7kNvwGfTQlQ&_nc_oc=AdqH7R0Ogs1AKOvty7aPpdFMcycGLl2DViR7fEn2Q8r_RD-eHXf_3gs3y0u0FhsphscLM1gJuWxIh5ghd1PnBeeM&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=fNvDi7VgvJIpPQ6XDFSDNw&_nc_ss=7a3a8&oh=00_Af2zum5ka7cEf0oluUUAO8nx6Fg7ZFgDND2jHwYOSl4egA&oe=69DD57A2', title: 'Art Competition', category: 'Activities' },
    { id: 8, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/497711550_2990929574419080_5460181133426516021_n.jpg?stp=dst-jpg_s417x417_tt6&_nc_cat=109&ccb=1-7&_nc_sid=f798df&_nc_ohc=Kn5QJf1p2ncQ7kNvwHB_3Pr&_nc_oc=Adr5WtK06jU3mu-6snkKZ9qIm7oYXnwwDjYCMnhb5oOqldy5NxfmxMII7_VhCCxx1YZqkWHgHwAnirB-7JH40FWa&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=977tU74YQt9eFx6HyqAWcQ&_nc_ss=7a3a8&oh=00_Af32GBycsT5gpD-Lelamu4VSw5_WIY9rKdnDNCAnXbwwHw&oe=69DD4518', title: 'Graduation Day', category: 'Events' },
    { id: 9, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/496921399_2990929697752401_831887323708459823_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f798df&_nc_ohc=23pbNk6yL7EQ7kNvwGrZLIU&_nc_oc=AdrwPGnF-CjC1vTANrX5akThVNYqHPQBxLWFv3hWmGB_JdYLFWXp2_mJdQ4D1_ljj0krsAxVsoxw1Q-LCplCzrBF&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=APN8rWIGRhzFrLN0C17Kmg&_nc_ss=7a3a8&oh=00_Af1zdx9Fy1QwjUP8kwmVsQhQvj7D2-eLNnxC_1WFgN2gQA&oe=69DD4A84', title: 'Computer Lab', category: 'Facilities' },
    { id: 10, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/496921399_2990929697752401_831887323708459823_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f798df&_nc_ohc=23pbNk6yL7EQ7kNvwGrZLIU&_nc_oc=AdrwPGnF-CjC1vTANrX5akThVNYqHPQBxLWFv3hWmGB_JdYLFWXp2_mJdQ4D1_ljj0krsAxVsoxw1Q-LCplCzrBF&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=APN8rWIGRhzFrLN0C17Kmg&_nc_ss=7a3a8&oh=00_Af1zdx9Fy1QwjUP8kwmVsQhQvj7D2-eLNnxC_1WFgN2gQA&oe=69DD4A84', title: 'Music Class', category: 'Activities' },
    { id: 11, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/496921399_2990929697752401_831887323708459823_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f798df&_nc_ohc=23pbNk6yL7EQ7kNvwGrZLIU&_nc_oc=AdrwPGnF-CjC1vTANrX5akThVNYqHPQBxLWFv3hWmGB_JdYLFWXp2_mJdQ4D1_ljj0krsAxVsoxw1Q-LCplCzrBF&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=APN8rWIGRhzFrLN0C17Kmg&_nc_ss=7a3a8&oh=00_Af1zdx9Fy1QwjUP8kwmVsQhQvj7D2-eLNnxC_1WFgN2gQA&oe=69DD4A84', title: 'Yoga Session', category: 'Activities' },
    { id: 12, src: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/496921399_2990929697752401_831887323708459823_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f798df&_nc_ohc=23pbNk6yL7EQ7kNvwGrZLIU&_nc_oc=AdrwPGnF-CjC1vTANrX5akThVNYqHPQBxLWFv3hWmGB_JdYLFWXp2_mJdQ4D1_ljj0krsAxVsoxw1Q-LCplCzrBF&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=APN8rWIGRhzFrLN0C17Kmg&_nc_ss=7a3a8&oh=00_Af1zdx9Fy1QwjUP8kwmVsQhQvj7D2-eLNnxC_1WFgN2gQA&oe=69DD4A84', title: 'Field Trip', category: 'Events' },
  ];

  // Group images into sets of 6 (3 columns x 2 rows)
  const itemsPerSlide = 6;
  const groupedSlides: GalleryImage[][] = [];
  for (let i = 0; i < images.length; i += itemsPerSlide) {
    groupedSlides.push(images.slice(i, i + itemsPerSlide));
  }

  const lightboxSlides = images.map((img) => ({ src: img.src }));

  return (
    <section className="gallery py-20" data-aos="fade-up" data-aos-duration="700">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-secondary text-lg font-semibold uppercase tracking-wide mb-2">
            Image Gallery
          </h3>
          <h2 className="heading-2">
            Captured Moments, Lasting Memories
          </h2>
        </div>

        {/* Swiper Carousel */}
        <div className="relative" data-aos="fade-up" data-aos-delay="200">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.gallery-swiper-button-next',
              prevEl: '.gallery-swiper-button-prev',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="gallery-swiper"
          >
            {groupedSlides.map((slide, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                {/* 3 columns, 2 rows grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="300">
                  {slide.map((image, imgIndex) => {
                    const globalIndex = slideIndex * itemsPerSlide + imgIndex;
                    return (
                      <div
                        key={image.id}
                        className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer"
                        onClick={() => {
                          setPhotoIndex(globalIndex);
                          setOpen(true);
                        }}
                        data-aos="zoom-in"
                        data-aos-delay={`${300 + imgIndex * 100}`}
                        data-aos-duration="600"
                      >
                        <div className="gallery-img">
                          <figure className="featured-image">
                            <img
                              src={image.src}
                              alt={image.title}
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </figure>
                        </div>
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                          <p className="text-white font-semibold text-lg">{image.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* If slide has fewer than 6 images, fill empty slots with placeholders (optional) */}
                {slide.length < itemsPerSlide && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {Array.from({ length: itemsPerSlide - slide.length }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="bg-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-400">
                        Coming Soon
                      </div>
                    ))}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="gallery-swiper-button-prev custom-arrow left-arrow">
            <svg viewBox="0 0 80 80" fill="currentColor" height="1.5em" width="1.5em">
              <path fill="none" stroke="currentColor" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth="4" d="M37 15L20 32l17 17"></path>
            </svg>
          </button>
          <button className="gallery-swiper-button-next custom-arrow right-arrow">
            <svg viewBox="0 0 80 80" fill="currentColor" height="1.5em" width="1.5em">
              <path fill="none" stroke="currentColor" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth="4" d="M27 15l17 17-17 17"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={lightboxSlides}
        index={photoIndex}
      />

      {/* Custom styles for navigation buttons */}
      <style>{`
        .gallery-swiper {
          padding-bottom: 3rem;
        }
        .custom-arrow {
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: var(--primary, #1E3A8A);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 10;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .custom-arrow:hover {
          background: var(--secondary, #F59E0B);
          transform: translateY(-50%) scale(1.05);
        }
        .left-arrow {
          left: -20px;
        }
        .right-arrow {
          right: -20px;
        }
        @media (max-width: 768px) {
          .left-arrow {
            left: 0px;
          }
          .right-arrow {
            right: 0px;
          }
          .custom-arrow {
            width: 32px;
            height: 32px;
          }
        }
        .swiper-pagination-bullet-active {
          background: var(--primary, #1E3A8A) !important;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
