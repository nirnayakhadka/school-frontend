// src/components/Booklet3D.tsx
import HTMLFlipBook from 'react-pageflip';
import { useState, useRef, useEffect } from 'react';

// Page images – replace with your actual brochure pages
const pageImages = [
  // Cover page (will be overridden by custom cover)
  '',
  'https://picsum.photos/id/26/800/1100',
  'https://picsum.photos/id/28/800/1100',
  'https://picsum.photos/id/29/800/1100',
  'https://picsum.photos/id/30/800/1100',
  'https://picsum.photos/id/31/800/1100',
  'https://picsum.photos/id/15/800/1100',
  'https://picsum.photos/id/42/800/1100',
];

const Booklet3D = () => {
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false); // prevent overlapping flips
const autoFlipInterval = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalPages = pageImages.length; // including cover

  const nextPage = () => {
    if (flipBookRef.current && !isFlipping) {
      setIsFlipping(true);
      flipBookRef.current.pageFlip().flipNext();
      // Reset flipping lock after animation time (800ms)
      setTimeout(() => setIsFlipping(false), 800);
    }
  };

  const prevPage = () => {
    if (flipBookRef.current && !isFlipping) {
      setIsFlipping(true);
      flipBookRef.current.pageFlip().flipPrev();
      setTimeout(() => setIsFlipping(false), 800);
    }
  };

  const onPageChange = (e: any) => {
    setCurrentPage(e.data);
  };

  // Auto-flip logic
  const startAutoFlip = () => {
    if (autoFlipInterval.current) clearInterval(autoFlipInterval.current);
    autoFlipInterval.current = setInterval(() => {
      // Only auto-flip if not on last page and not currently flipping
      if (flipBookRef.current && !isFlipping && currentPage < totalPages - 1) {
        nextPage();
      } else if (currentPage >= totalPages - 1) {
        // Optionally reset to first page? We'll just stop at the end.
        if (autoFlipInterval.current) clearInterval(autoFlipInterval.current);
      }
    }, 2000);
  };

  const stopAutoFlip = () => {
    if (autoFlipInterval.current) {
      clearInterval(autoFlipInterval.current);
      autoFlipInterval.current = null;
    }
  };

  // Start auto-flip on mount, stop on unmount
  useEffect(() => {
    startAutoFlip();
    return () => stopAutoFlip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restart auto-flip after manual page change (so it doesn't get stuck)
  useEffect(() => {
    // Restart timer when page changes manually
    if (autoFlipInterval.current) {
      startAutoFlip();
    }
  }, [currentPage]);

  // Pause on hover
  const handleMouseEnter = () => stopAutoFlip();
  const handleMouseLeave = () => startAutoFlip();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container-custom">
        {/* Two column layout: Left content, Right booklet */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Column - Text & Controls */}
          <div className="lg:w-1/2 space-y-8">
            <div data-aos="fade-up" className="text-center lg:text-left">
              <h3 className="text-secondary text-lg font-semibold uppercase tracking-wide mb-2">
                School Brochure
              </h3>
              <h2 className="heading-2">
                Explore Our Booklet
              </h2>

            </div>

            {/* Navigation & Page Controls */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={prevPage}
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <span className="text-gray-700 font-medium bg-gray-100 px-4 py-2 rounded-full">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center lg:text-left">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                Download Full Brochure (PDF)
              </a>
            </div>

            <div className="hidden lg:block pt-4">
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>
          </div>

          {/* Right Column - Booklet (Smaller Size) */}
          <div 
            className="lg:w-1/2 flex justify-center items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full max-w-md mx-auto relative">
              <HTMLFlipBook
                startPage={0}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
                ref={flipBookRef}
                width={380}
                height={507}
                size="fixed"
                minWidth={280}
                maxWidth={420}
                minHeight={374}
                maxHeight={560}
                drawShadow={true}
                flippingTime={800}
                usePortrait={true}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.6}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={onPageChange}
                className="flipbook-3d"
                style={{ margin: '0 auto' }}
              >
                {/* Custom Cover Page */}
                <div className="page relative bg-gradient-to-br from-primary to-primary/80 shadow-xl">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="w-32 h-32 mb-5 rounded-full bg-white/10 backdrop-blur-sm p-3 shadow-lg">
                      <img
                        src="/image/logo/schoollogo.jpeg"
                        alt="Cornerstone Foundation Logo"
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Cornerstone Foundation
                    </h1>
                    <p className="text-white/90 text-base mb-3">Damak, Jhapa</p>
                    <div className="w-16 h-0.5 bg-secondary mx-auto mb-3"></div>
                    <p className="text-white/80 italic text-sm">"Help me do it myself"</p>
                    <div className="absolute bottom-6 left-0 right-0 text-white/60 text-xs">
                      Prospectus 2025-26
                    </div>
                  </div>
                </div>

                {/* Inner Pages */}
                {pageImages.slice(1).map((img, idx) => (
                  <div key={idx} className="page relative bg-white shadow-lg">
                    <img
                      src={img}
                      alt={`Brochure page ${idx + 2}`}
                      className="w-full h-full object-cover rounded-sm"
                    />
                    <div className="absolute bottom-3 right-3 text-white bg-black/50 text-xs px-2 py-0.5 rounded-full">
                      Page {idx + 2}
                    </div>
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flipbook-3d {
          margin: 0 auto;
          border-radius: 12px;
          box-shadow: 0 25px 40px -12px rgba(0,0,0,0.35);
          transition: transform 0.2s ease;
        }
        .flipbook-3d:hover {
          transform: scale(1.01);
        }
        .page {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 20px -6px rgba(0,0,0,0.2);
        }
        .flipbook-3d::-webkit-scrollbar {
          width: 0px;
        }
        @media (max-width: 768px) {
          .flipbook-3d {
            transform: scale(0.98);
          }
          .flipbook-3d:hover {
            transform: scale(0.99);
          }
        }
      `}</style>
    </section>
  );
};

export default Booklet3D;