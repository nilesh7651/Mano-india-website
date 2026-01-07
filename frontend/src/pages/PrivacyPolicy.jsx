import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <SEO
                title="Privacy Policy | ManoIndia"
                description="Read our Privacy Policy to understand how we collect, use, and protect your personal information at ManoIndia."
            />

            <h1 className="text-4xl font-bold text-amber-500 mb-4">Privacy Policy</h1>
            <p className="text-gray-400 mb-10 text-sm">Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="space-y-10 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                    <p>
                        Welcome to ManoIndia. This Privacy Policy explains how ManoIndia, managed by <strong>Mayramurti Pvt. Ltd.</strong> ("we," "us," or "our"), collects, uses, discloses, and protects your information when you access our website (www.manoindia.in) and use our services.
                    </p>
                    <p className="mt-4">
                        We are committed to protecting your personal data and your privacy. By using our platform, you consent to the data practices described in this policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium text-amber-500/90 mb-2">2.1 Personal Information</h3>
                            <p>We collect information that you voluntarily provide to us when you register on the Platform, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Platform, or otherwise when you contact us. This may include:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                                <li>Name, email address, phone number, and mailing address.</li>
                                <li>Billing information (processed securely by our payment partners).</li>
                                <li>Profile information (for Artists and Venues), including photos, videos, and descriptions.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-amber-500/90 mb-2">2.2 Usage Data</h3>
                            <p>We automatically collect certain information when you visit, use, or navigate the Platform. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our Platform.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                    <p>We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent, including:</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
                        <li><strong>To facilitate account creation and logon process:</strong> If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process.</li>
                        <li><strong>To facilitate bookings:</strong> We share necessary details (Name, Contact) with the Artist or Venue you have booked to ensure service delivery.</li>
                        <li><strong>To send administrative information to you:</strong> We may use your personal information to send you product, service and new feature information and/or information about changes to our terms, conditions, and policies.</li>
                        <li><strong>To protect our Services:</strong> We may use your information as part of our efforts to keep our Platform safe and secure (for example, for fraud monitoring and prevention).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">4. Sharing Your Information</h2>
                    <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
                        <li><strong>Service Providers:</strong> We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., Razorpay for payment processing, Cloudinary for image hosting).</li>
                        <li><strong>Artists and Venues:</strong> When you make a booking, we share your contact details with the respective service provider to enable communication and coordination.</li>
                        <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
                    <p>
                        We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Platform is at your own risk.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">6. Your Privacy Rights</h2>
                    <p>In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.</p>
                    <p className="mt-4">
                        To exercise these rights, please contact us at <a href="mailto:manoindia01@gmail.com" className="text-amber-500 hover:underline">manoindia01@gmail.com</a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">7. Cookie Policy</h2>
                    <p>
                        We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
                    <p>If you have questions or comments about this policy, you may email us at <a href="mailto:manoindia01@gmail.com" className="text-amber-500 hover:underline">manoindia01@gmail.com</a> or by post to:</p>
                    <address className="mt-4 not-italic text-gray-400 border-l-4 border-amber-500 pl-4">
                        <strong>ManoIndia (Mayramurti Pvt. Ltd.)</strong><br />
                        Bhub, BSFC Building,<br />
                        Frazer Road,<br />
                        Patna – 800001<br />
                        India
                    </address>
                </section>
            </div>
        </div>
    );
}
