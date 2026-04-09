const CTA = () => {
  return (
    <section className="py-20 bg-blue-950 text-primary" data-aos="fade-up" data-aos-duration="800">
      <div className="container-custom text-center">
        <h2 className="heading-2 mb-4 text-white" data-aos="fade-down" data-aos-delay="100">
          Join Cornerstone Foundation Today
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-9 text-white/80" data-aos="fade-up" data-aos-delay="200">
          Give your child the gift of quality education. Limited seats available for the upcoming academic session.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="zoom-in" data-aos-delay="300">
          <button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg">
            Apply Now
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition">
            Request Info
          </button>
        </div>
        <p className="text-sm mt-6 opacity-100 text-white" data-aos="fade-up" data-aos-delay="400">📞 Call us: +977-23585188 | ✉️ cornerstonedmk@gmail.com</p>
      </div>
    </section>
  );
};

export default CTA;
