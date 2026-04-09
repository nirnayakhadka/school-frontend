import { useState, useEffect, useRef } from 'react';
import TopBar from '../components/nav/TopBar';
import Navbar from '../components/nav/Navbar';
import NoticeTicker from '../components/NoticeTicker';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import SocialMediaSection from '../components/SocialMediaSection';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
// import Booklet3D from '../components/BrochureFlipbook';
import OurTeams from '../components/Ourteams';
const Home = () => {
  const [scrolled, setScrolled] = useState(false);       // topbar collapses
  const [headerVisible, setHeaderVisible] = useState(true); // full header hide/show
  const [noticeVisible, setNoticeVisible] = useState(true); // notice only hides on scroll down
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      // Collapse TopBar after 60px
      setScrolled(y > 60);

      if (delta > 2 && y > 80) {
        // Scrolling DOWN — hide everything
        setHeaderVisible(false);
        setNoticeVisible(false);
      } else if (delta < -2) {
        // Scrolling UP — show header + navbar, but NOT notice ticker
        setHeaderVisible(true);
        setNoticeVisible(false); // notice stays hidden on scroll up
      }

      // Only show notice ticker at very top
      if (y < 10) {
        setNoticeVisible(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* Notice Ticker — topmost, hides on any scroll */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          noticeVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <NoticeTicker />
      </div>

      {/* Main header — TopBar + Navbar */}
      <div
        className={`fixed left-0 w-full z-40 transition-transform duration-300 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ top: noticeVisible ? '36px' : '0px', transition: 'top 0.3s, transform 0.3s' }}
      >
        <TopBar scrolled={scrolled} />
        <Navbar scrolled={scrolled} />
      </div>

      {/* Spacer: notice(36) + topbar(~88) + navbar(~48) = 172px; when scrolled topbar hidden */}
      <div style={{ height: scrolled ? 84 : 152 }} className="transition-all duration-300" />

      <section id="home" className="w-full" data-aos="fade-down" data-aos-duration="800"><Hero /></section>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <section id="about" data-aos="fade-up" data-aos-duration="700"><About /></section>
        <section id="academics" data-aos="fade-up" data-aos-delay="100" data-aos-duration="700"><Features /></section>
        <section id="social" data-aos="fade-up" data-aos-delay="200" data-aos-duration="700"><SocialMediaSection /></section>

        <section id="gallery" data-aos="fade-up" data-aos-delay="300" data-aos-duration="700"><Gallery /></section>
        {/* <section id="brochure"><Booklet3D /></section> */}
        <section id="teams" data-aos="fade-up" data-aos-delay="400" data-aos-duration="700"><OurTeams /></section>
        <section id="testimonials" data-aos="fade-up" data-aos-delay="500" data-aos-duration="700"><Testimonials /></section>
        
      </main>
      <section id="admissions" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800"><CTA /></section>
      <Footer data-aos="fade-up" data-aos-delay="600" />

    </div>
  );
};

export default Home;
