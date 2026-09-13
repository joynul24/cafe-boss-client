import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full text-white">
      {/* Upper Footer with 2 split columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 text-center">
        
        {/* Left Side: CONTACT US */}
        <div className="bg-[#1F2937] py-12 px-6 flex flex-col items-center justify-center space-y-3">
          <h3 className="text-xl font-medium tracking-wide uppercase mb-2">
            CONTACT US
          </h3>
          <p className="text-sm text-gray-300">
            123 ABS Street, Uni 21, Bangladesh
          </p>
          <p className="text-sm text-gray-300">
            +88 123456789
          </p>
          <p className="text-sm text-gray-300">
            Mon - Fri: 08:00 - 22:00
          </p>
          <p className="text-sm text-gray-300">
            Sat - Sun: 10:00 - 23:00
          </p>
        </div>

        {/* Right Side: Follow US */}
        <div className="bg-[#111827] py-12 px-6 flex flex-col items-center justify-center space-y-4">
          <h3 className="text-xl font-medium tracking-wide uppercase">
            Follow US
          </h3>
          <p className="text-sm text-gray-300">
            Join us on social media
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-5 pt-2">
            <a 
              href="#" 
              aria-label="Facebook" 
              className="hover:text-gray-400 transition-colors duration-200 text-xl"
            >
              <FaFacebookF />
            </a>
            <a 
              href="#" 
              aria-label="Instagram" 
              className="hover:text-gray-400 transition-colors duration-200 text-2xl"
            >
              <FaInstagram />
            </a>
            <a 
              href="#" 
              aria-label="Twitter" 
              className="hover:text-gray-400 transition-colors duration-200 text-xl"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-[#151515] py-4 text-center text-xs text-gray-300">
        <p>Copyright © CulinaryCloud. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;