import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import type { Testimonial } from '../types/index.ts';

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Mrs. Sunita Sharma',
      role: 'Parent',
      content: 'Cornerstone Foundation has transformed my child\'s learning experience. The teachers are dedicated and the environment is nurturing. Truly the best school in Damak!',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
    },
    {
      id: 2,
      name: 'Mr. Rajesh Adhikari',
      role: 'Alumni Parent',
      content: 'Excellent infrastructure and teaching methodology. My son excelled in academics and extracurriculars. Highly recommended for holistic education.',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 5,
    },
    {
      id: 3,
      name: 'Anjali K.C.',
      role: 'Grade 10 Student',
      content: 'I love my school! The teachers are supportive and the labs are amazing. I have grown so much in confidence and knowledge.',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
    },
    {
      id: 4,
      name: 'Mr. Bikram Thapa',
      role: 'Local Business Owner',
      content: 'As a community member, I\'ve seen the positive impact of Cornerstone Foundation. They produce well-rounded students who contribute to society.',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      rating: 4,
    },
  ];

  return (
    <section className="py-20" data-aos="fade-up" data-aos-duration="700">
      <div className="container-custom">
        <h2 className="heading-2" data-aos="fade-down" data-aos-delay="100">What People Say</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          spaceBetween={30}
          className="pb-12"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          {testimonials.map((testimonial, i) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all" data-aos="zoom-in" data-aos-delay={`${i * 150}`} data-aos-duration="600">
                <FaQuoteLeft className="text-secondary text-3xl mb-4 opacity-50" />
{testimonial.content || 'No testimonial available'}
                <div className="flex items-center gap-4">
                  <img
src={testimonial.avatar || 'https://via.placeholder.com/56x56/eee/999?text=?'}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <FaStar key={j} className="text-yellow-500 text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
