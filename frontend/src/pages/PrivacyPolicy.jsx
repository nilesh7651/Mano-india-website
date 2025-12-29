import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold text-amber-500 mb-8">Privacy Policy</h1>

            <div className="space-y-6 text-gray-300">
                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, update your profile, book an artist or venue, or communicate with us.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, facilitate bookings, process payments, and communicate with you.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">3. Info Sharing</h2>
                    <p>We may share your information with artists or venues as necessary to facilitate your bookings. We do not sell your personal information to third parties.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">4. Security</h2>
                    <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">5. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at info@mayramurti.com.</p>
                </section>
            </div>
        </div>
    );
}
