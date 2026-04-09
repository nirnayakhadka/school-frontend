// src/components/Features.tsx
import { FaBook, FaChalkboardTeacher, FaFlask, FaFutbol } from 'react-icons/fa';
import type { Feature } from '../types/index.ts';

const Features = () => {
  const features: Feature[] = [
    {
      id: 1,
      title: 'Quality Education',
      description: 'CBSE affiliated curriculum with modern teaching methods and personalized attention.',
      icon: <FaBook className="text-4xl text-secondary" />,
    },
    {
      id: 2,
      title: 'Experienced Teachers',
      description: 'Dedicated faculty with years of expertise in their respective fields.',
      icon: <FaChalkboardTeacher className="text-4xl text-secondary" />,
    },
    {
      id: 3,
      title: 'Modern Facilities',
      description: 'Smart classrooms, science labs, computer lab, and well-stocked library.',
      icon: <FaFlask className="text-4xl text-secondary" />,
    },
    {
      id: 4,
      title: 'Extracurricular Activities',
      description: 'Sports, arts, music, debate, and robotics club for holistic development.',
      icon: <FaFutbol className="text-4xl text-secondary" />,
    },
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="heading-2">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
