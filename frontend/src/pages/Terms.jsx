import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function Terms() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <SEO
                title="Terms and Conditions | ManoIndia"
                description="Read the Terms and Conditions for using ManoIndia's platform for booking artists and venues."
            />

            <h1 className="text-4xl font-bold text-amber-500 mb-4">Terms and Conditions</h1>
            <p className="text-gray-400 mb-10 text-sm">Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="space-y-10 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                    <p>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and <strong>Mayramurti Pvt. Ltd.</strong>, doing business as <strong>ManoIndia</strong> (“we,” “us” or “our”), concerning your access to and use of the <Link to="/" className="text-amber-500 hover:underline">manoindia.in</Link> website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Platform”).
                    </p>
                    <p className="mt-4">
                        You agree that by accessing the Platform, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Platform and you must discontinue use immediately.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">2. User Registration</h2>
                    <p>
                        You may be required to register with the Platform. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">3. Booking Services</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li><strong>Platform Role:</strong> ManoIndia acts as an intermediary platform connecting users (Clients) with Artists, Event Managers, and Venues (Service Providers). We are not the direct provider of the services listed unless explicitly stated.</li>
                        <li><strong>Booking Contracts:</strong> Any booking made through our platform forms a direct contract between the Client and the Service Provider. ManoIndia is not a party to this contract but facilitates the transaction.</li>
                        <li><strong>Accuracy:</strong> While we verify Service Providers, we do not guarantee the completeness or accuracy of their profiles or the quality of their services.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">4. Payment and Fees</h2>
                    <p>
                        We accept payments through Razorpay and other authorized payment gateways. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Platform.
                    </p>
                    <p className="mt-2 text-gray-400">
                        <strong>Service Fees:</strong> We may charge a service fee or commission on bookings, which will be clearly displayed before you confirm your payment.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">5. User Representations</h2>
                    <p>By using the Platform, you represent and warrant that:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                        <li>All registration information you submit will be true, accurate, current, and complete.</li>
                        <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                        <li>You will not use the Platform for any illegal or unauthorized purpose.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property Rights</h2>
                    <p>
                        Unless otherwise indicated, the Platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Platform (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                    <p>
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Platform, even if we have been advised of the possibility of such damages.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">8. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and defined following the laws of India. <strong>Mayramurti Pvt. Ltd.</strong> and yourself irrevocably consent that the courts of Patna, Bihar shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
                    <p>In order to resolve a complaint regarding the Platform or to receive further information regarding use of the Platform, please contact us at:</p>
                    <div className="mt-4 text-gray-400 bg-gray-900 p-6 rounded-xl border border-gray-800">
                        <p className="font-bold text-white mb-1">ManoIndia (Mayramurti Pvt. Ltd.)</p>
                        <p>Bhub, BSFC Building, Frazer Road</p>
                        <p>Patna – 800001, India</p>
                        <p className="mt-2">Phone: +91 87097 36094</p>
                        <p>Email: <a href="mailto:manoindia01@gmail.com" className="text-amber-500 hover:underline">manoindia01@gmail.com</a></p>
                    </div>
                </section>
            </div>

            <div className="mt-20 border-t border-gray-900 pt-6 flex justify-center">
                <Link to="/developer-team" className="text-gray-700 text-[10px] hover:text-gray-500 transition-colors select-none">
                    System Architecture & Design
                </Link>
            </div>
        </div >
    );
}
