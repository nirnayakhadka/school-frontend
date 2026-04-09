import { FaFacebook, FaTiktok, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = ['About Us', 'Academics', 'Admissions', 'Gallery', 'Contact'];
  const resources = ['Calendar', 'Newsletter', 'Alumni', 'Careers', 'Blog'];

  return (
    <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* School Info */}
          <div>
            <a href="#home" className="flex items-center gap-3 mb-4 block">
              <img 
                src="/image/logo/schoollogo.jpeg" 
                alt="Cornerstone Foundation" 
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </a>
            <p className="text-gray-400 mb-6">
              "Help me do it myself" - Empowering young minds with quality education since 2005.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/csfdamak" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition" aria-label="Facebook">
                <FaFacebook size={22} />
              </a>
              <a href="https://tiktok.com/@cornerstone_foundation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition" aria-label="TikTok">
                <FaTiktok size={22} />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition" aria-label="Instagram">
                <FaInstagram size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div >
            <h4 className="text-lg font-semibold mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Resources</h4>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
                <p className="text-gray-400">Damak-5, Jhapa, Nepal</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-secondary flex-shrink-0" />
                <p className="text-gray-400">+977-23585188 / 9705008987</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-secondary flex-shrink-0" />
                <p className="text-gray-400">cornerstonedmk@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Cornerstone Foundation Damak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

