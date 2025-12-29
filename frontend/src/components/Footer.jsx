import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-20 text-gray-300">
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
            ✉️ info@mayramurti.com
          </p>
          <p className="text-sm text-gray-400 mt-2 hover:text-amber-500 transition-colors cursor-pointer">
            🌐 www.mayramurti.com
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