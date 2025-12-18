export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">ManoIndia</h2>
          <p className="mt-3 text-sm text-gray-600">
            Managed & Organized by <br />
            <span className="font-medium">Mayramurti Pvt. Ltd.</span>
          </p>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Office Address</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Bhub, BSFC Building,<br />
            Frazer Road,<br />
            Patna – 800001
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
          <p className="text-sm text-gray-600">
            📞 +91 87097 36094
          </p>
          <p className="text-sm text-gray-600 mt-1">
            ✉️ info@mayramurti.com
          </p>
          <p className="text-sm text-gray-600 mt-1">
            🌐 www.mayramurti.com
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Our Services</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Management</li>
            <li>• Marketing</li>
            <li>• Creative</li>
            <li>• Analysis</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-2">
          <p>
            CIN: U70200BR2023PTC064260 | GST: 10AARCM1035D1Z1
          </p>
          <p>
            © {new Date().getFullYear()} ManoIndia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
