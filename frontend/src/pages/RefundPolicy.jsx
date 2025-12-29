import React from 'react';

export default function RefundPolicy() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold text-amber-500 mb-8">Cancellation & Refund Policy</h1>

            <div className="space-y-6 text-gray-300">
                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">1. Cancellation by User</h2>
                    <p>You may cancel your booking request at any time before it is accepted by the artist or venue. Once accepted, cancellations are subject to the specific cancellation terms of the service provider.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">2. Cancellation by Artist/Venue</h2>
                    <p>In the unlikely event that an artist or venue cancels a confirmed booking, you will receive a full refund of any amounts paid.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">3. Refund Process</h2>
                    <p>Approved refunds will be processed within 7-14 business days to the original method of payment.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">4. Disputes</h2>
                    <p>If you have any issues with a service provided or a refund request, please contact our support team for resolution.</p>
                </section>
            </div>
        </div>
    );
}
