import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="bg-black border-t border-gray-800 mt-20 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-amber-500 tracking-wide">ManoIndia</h2>
          <p className="mt-4 text-sm text-gray-400">
            Managed & Organized by <br />
            <span className="font-semibold text-white">Mayramurti Pvt. Ltd.</span>
          </p>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Office Address</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Bhub, BSFC Building,<br />
            Frazer Road,<br />
            Patna – 800001
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Contact</h3>
          <p className="text-sm text-gray-400 hover:text-amber-500 transition-colors cursor-pointer">
            📞 +91 87097 36094
          </p>
          <p className="text-sm text-gray-400 mt-2 hover:text-amber-500 transition-colors cursor-pointer">
            ✉️ manoindia01@gmail.com
          </p>
          <p className="text-sm text-gray-400 mt-2 hover:text-amber-500 transition-colors cursor-pointer">
            🌐 www.manoindia.in
          </p>
        </div>



        {/* Legal */}
        <div>
          <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Legal</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <Link to="/privacy-policy" className="hover:text-amber-500 transition-colors cursor-pointer">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-amber-500 transition-colors cursor-pointer">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-amber-500 transition-colors cursor-pointer">Refund Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Supported By Section - Ultra Premium Design */}
      <div className="relative border-t border-gray-900 bg-[#050505] py-20 overflow-hidden">

        {/* Ambient Lighting Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">



          <h3 className="text-3xl md:text-4xl font-serif text-white mb-12 tracking-wide">
            Supported by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">Startup Bihar</span>
          </h3>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">

              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out" />

              <div className="flex-1 flex justify-center items-center w-full border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                <div className="relative group/logo">
                  <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                  <img
                    src="/startup_bihar_logo1.png"
                    alt="Startup Bihar"
                    className="h-20 md:h-24 w-auto object-contain relative z-10 brightness-110 contrast-125 transform transition-transform duration-500 group-hover/logo:scale-110"
                  />
                </div>
              </div>

              <div className="flex-1 flex justify-center items-center w-full border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:px-6">
                <div className="relative group/logo">
                  <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                  <img
                    src="/4.png"
                    alt="Partner Logo"
                    className="h-20 md:h-24 w-auto object-contain relative z-10 brightness-110 contrast-125 transform transition-transform duration-500 group-hover/logo:scale-110"
                  />
                </div>
              </div>

              <div className="flex-1 flex justify-center items-center w-full pl-0 md:pl-6">
                <div className="relative group/logo">
                  <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                  <img
                    src="/5.png"
                    alt="Partner Logo"
                    className="h-20 md:h-24 w-auto object-contain relative z-10 brightness-110 contrast-125 transform transition-transform duration-500 group-hover/logo:scale-110"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs md:text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-4 items-center">
          <p className="text-center md:text-left">
            CIN: U70200BR2023PTC064260 | GST: 10AARCM1035D1Z1
          </p>
          <p className="text-center md:text-right">
            © {new Date().getFullYear()} <span className="text-amber-600">ManoIndia</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}