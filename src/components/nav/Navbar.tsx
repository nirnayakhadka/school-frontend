// src/components/nav/Navbar.tsx
import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

interface DropdownItem {
  label: string;
  sub?: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  {
    name: "About",
    dropdown: [
      { label: "Our Story", sub: "History and mission", href: "#about" },
      {
        label: "Leadership",
        sub: "Principal & management",
        href: "#leadership",
      },
      {
        label: "Vision & Mission",
        sub: "Our guiding principles",
        href: "#mission",
      },
      {
        label: "Awards & Achievements",
        sub: "Our proud milestones",
        href: "#awards",
      },
      {
        label: "Affiliations",
        sub: "Partner organizations",
        href: "#affiliations",
      },
    ],
  },
  {
    name: "Academics",
    dropdown: [
      { label: "Primary School", sub: "Classes 1–5", href: "#primary" },
      { label: "Lower Secondary", sub: "Classes 6–8", href: "#secondary" },
      { label: "SEE / Class 10", sub: "Board exam prep", href: "#see" },
      { label: "+2 Science", sub: "Physics, Bio, Maths", href: "#science" },
      {
        label: "+2 Management",
        sub: "Business & Accounting",
        href: "#management",
      },
      { label: "Hotel Management", sub: "Hospitality program", href: "#hotel" },
      {
        label: "Academic Calendar",
        sub: "2080–81 schedule",
        href: "#calendar",
      },
      { label: "Exam Results", sub: "Latest notices", href: "#results" },
    ],
  },
  {
    name: "Admissions",
    dropdown: [
      { label: "How to Apply", sub: "Step-by-step guide", href: "#apply" },
      { label: "Requirements", sub: "Documents needed", href: "#requirements" },
      { label: "Fee Structure", sub: "Tuition & other fees", href: "#fees" },
      {
        label: "Scholarships",
        sub: "Merit-based support",
        href: "#scholarships",
      },
    ],
  },
  {
    name: "Gallery",
    dropdown: [
      {
        label: "Photo Gallery",
        sub: "School events & activities",
        href: "#gallery",
      },
      { label: "Video Gallery", sub: "Highlights & programs", href: "#videos" },
    ],
  },
  { name: "Contact", href: "#contact" },
];

interface NavbarProps {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);

  return (
    <div className="w-full bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
        {/* Logo — only shown after scroll */}
        <div
          className={`transition-all duration-300 overflow-hidden ${scrolled ? "w-10 opacity-100 mr-3" : "w-0 opacity-0"}`}
        >
          <img
            src="/image/logo/schoollogo.jpeg"
            alt="Logo"
            className="h-8 w-8 rounded-full object-cover border-2 border-white/30"
          />
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center h-full flex-1">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative group h-full flex items-center"
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-4 h-full text-[16.5px] text-white/90 hover:text-white hover:bg-white/10 transition-colors font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <>
                  <button className="flex items-center gap-1 px-4 h-full text-[16.5px] text-white/90 hover:text-white hover:bg-white/10 transition-colors font-medium whitespace-nowrap">
                    {item.name}
                    <FaChevronDown
                      size={9}
                      className="transition-transform duration-200 group-hover:rotate-180 mt-0.5"
                    />
                  </button>
                  <div
                    className={`absolute top-full left-0 bg-white rounded-b-xl shadow-xl py-2 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 translate-y-[-4px] group-hover:translate-y-0 z-50 ${
                      item.name === "Academics"
                        ? "grid grid-cols-2 gap-1 min-w-[460px]"
                        : "min-w-[230px]"
                    }`}
                  >
                    {item.dropdown?.map((d) => (
                      <a
                        key={d.href}
                        href={d.href}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group/item"
                      >
                        <div>
                          <p className="text-[16px] text-gray-900 group-hover/item:text-[#1a3a5c] font-medium">
                            {d.label}
                          </p>
                          {d.sub && (
                            <p className="text-[13px] text-gray-400">{d.sub}</p>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Get a Quote button — desktop only */}
        <a
          href="#quote"
          className="hidden md:inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white text-[14px] font-semibold px-5 py-2 rounded transition-colors whitespace-nowrap ml-4 shrink-0"
        >
          Get a Quote
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-1.5"
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a3a5c] border-t border-white/10 pb-4">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setOpenMobileItem(
                        openMobileItem === item.name ? null : item.name,
                      )
                    }
                    className="w-full flex items-center justify-between px-6 py-3 text-[14px] text-white/90 hover:bg-white/10"
                  >
                    {item.name}
                    <FaChevronDown
                      size={10}
                      className={`transition-transform ${openMobileItem === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openMobileItem === item.name && (
                    <div className="bg-[#132d48]">
                      {item.dropdown.map((d) => (
                        <a
                          key={d.href}
                          href={d.href}
                          onClick={() => setMenuOpen(false)}
                          className="block px-10 pr-6 py-2.5 text-[13px] text-white/70 hover:text-white hover:bg-white/5"
                        >
                          {d.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3 text-[14px] text-white/90 hover:bg-white/10"
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
          <div className="px-6 pt-3 flex flex-col gap-2">
            {/* Get a Quote — mobile */}
            <a
              href="#quote"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white py-2.5 rounded font-semibold text-[13px] transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
