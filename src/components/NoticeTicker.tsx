// src/components/NoticeTicker.tsx
import { useState } from 'react';

interface Notice {
  id: number;
  day: string;
  month: string;
  title: string;
  link?: string;
}

const notices: Notice[] = [
  { id: 1, day: '05', month: 'Apr', title: 'सूचना ।', link: '#' },
  { id: 2, day: '01', month: 'Apr', title: 'सूचना ।', link: '#' },
  { id: 3, day: '17', month: 'Mar', title: 'परीक्षाको तयारी बिदा सम्बन्धी सूचना', link: '#' },
  { id: 4, day: '17', month: 'Feb', title: 'नतिजा प्रकासन सम्बन्धि सूचना ।', link: '#' },
  { id: 5, day: '17', month: 'Feb', title: 'सूचना ।', link: '#' },
  { id: 6, day: '17', month: 'Feb', title: 'कक्षा सञ्चालन सम्बन्धि सूचना ।', link: '#' },
  { id: 7, day: '18', month: 'Feb', title: 'कक्षा ११ र १२ तर्फको नतिजा प्रकाशन तथा रक्तदान कार्यक्रम सम्बन्धी सूचना', link: '#' },
  { id: 8, day: '18', month: 'Feb', title: 'कक्षा सञ्चालन सम्बन्धि सूचना ।', link: '#' },
  { id: 9, day: '26', month: 'Feb', title: 'सूचना (विद्यालय तर्फ)', link: '#' },
  { id: 10, day: '30', month: 'Mar', title: 'कक्षा १२ को वार्षिक परीक्षाको प्रवेश पत्र सम्बन्धी सूचना', link: '#' },
  { id: 11, day: '07', month: 'Apr', title: 'कक्षा ११ वार्षिक परीक्षा (Board Exam) को समय तालिका', link: '#' },
];

const NoticeTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const duplicated = [...notices, ...notices];

  return (
    <div className="w-full bg-blue-800 text-white py-1.5 overflow-hidden">
      <div className="flex items-center">

        {/* Label */}
        <div
          className="flex-shrink-0 bg-[#1a3a5c] text-white px-5 py-1.5 font-semibold text-sm flex items-center gap-2 relative z-10"
          style={{ clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)' }}
        >
          Notice
        </div>

        {/* Scrolling track */}
        <div
          className="flex-1 overflow-hidden ml-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex items-center gap-8 whitespace-nowrap animate-noticeScroll"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicated.map((notice, idx) => (
              <a                                          // ✅ was missing "<a"
                key={idx}
                href={notice.link || '#'}
                className="inline-flex items-center gap-2 text-white hover:text-yellow-200 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex flex-col items-center justify-center shadow">
                  <span className="text-[10px] font-bold text-[#2db83d] leading-tight">{notice.day}</span>
                  <span className="text-[8px] text-[#2db83d] leading-tight">{notice.month}</span>
                </div>
                <span className="text-[13px]">{notice.title}</span>
                <span className="text-white/40 mx-2">|</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeTicker;