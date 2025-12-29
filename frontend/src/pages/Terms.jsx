import React from 'react';

export default function Terms() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold text-amber-500 mb-8">Terms and Conditions</h1>

            <div className="space-y-6 text-gray-300">
                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                    <p>By accessing or using our platform, you agree to be bound by these Terms and Conditions and our Privacy Policy.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">2. User Accounts</h2>
                    <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">3. Booking Services</h2>
                    <p>Our platform connects users with artists and venues. We are not a party to the actual contract between users and service providers, though we facilitate the booking process.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">4. Payments</h2>
                    <p>All payments are processed securely. You agree to pay all charges associated with your bookings in accordance with the billing terms in effect at the time the fee or charge becomes payable.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">5. Limitation of Liability</h2>
                    <p>ManoIndia shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits.</p>
                </section>
            </div>
        </div>
    );
}
