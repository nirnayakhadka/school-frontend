// src/components/nav/TopBar.tsx
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";

interface TopBarProps {
  scrolled: boolean;
}

const TopBar = ({ scrolled }: TopBarProps) => (
  <div
    className={`w-full bg-white border-b border-gray-100 transition-all duration-300 overflow-hidden ${
      scrolled ? "h-0 opacity-0" : "opacity-100"
    }`}
    style={{ height: scrolled ? 0 : undefined }}
  >
    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
      {/* Logo + School Name */}
      <a
        href="#home"
        className="flex items-center gap-3 hover:opacity-90 transition"
      >
        <img
          src="/image/logo/schoollogo.jpeg"
          alt="Cornerstone Foundation"
          className="h-14 w-14 object-contain rounded-full border-2 border-gray-100"
        />
        <div>
          <h1 className="font-bold text-primary text-xl leading-tight">
            Cornerstone Foundation
          </h1>
          <p className="text-secondary font-semibold text-base">
            Education for Excellence
          </p>
        </div>
      </a>

      {/* Contact Info */}
      <div className="hidden lg:flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1a3a5c]">
            <FaMapMarkerAlt className="text-primary" size={18} />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800">
              Damak-06, Jhapa
            </p>
            <p className="text-sm text-gray-500">Koshi Province, Nepal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1a3a5c]">
            <FaEnvelope className="text-primary" size={18} />
          </div>
          <div>
            <p className="text-base font-semibold text-[#1a3a5c]">
              cornerstonedmk@gmail.com
            </p>
            <p className="text-sm text-gray-500">Opening Hours: 8am to 4pm</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1a3a5c]">
            <FaPhoneAlt className="text-primary" size={18} />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800">
              +977-23585188
            </p>
            <p className="text-sm text-gray-500">For Any Enquiry</p>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="hidden md:flex items-center gap-2">
        <a
          href="https://facebook.com/csfdamak"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition"
        >
          <FaFacebook size={16} />
        </a>
        <a
          href="https://tiktok.com/@cornerstone_foundation"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
        >
          <FaTiktok size={16} />
        </a>
      </div>
    </div>
  </div>
);

export default TopBar;
