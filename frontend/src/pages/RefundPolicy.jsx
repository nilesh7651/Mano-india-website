import React from 'react';
import SEO from '../components/SEO';

export default function RefundPolicy() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <SEO
                title="Cancellation & Refund Policy | ManoIndia"
                description="Understand our cancellation and refund policies for bookings made through ManoIndia."
            />

            <h1 className="text-4xl font-bold text-amber-500 mb-4">Cancellation & Refund Policy</h1>
            <p className="text-gray-400 mb-10 text-sm">Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="space-y-10 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">1. General Overview</h2>
                    <p>
                        At ManoIndia, we strive to ensure that both our Clients and Service Providers (Artists, Venues, Event Managers) have a fair and transparent experience. This policy outlines the terms under which cancellations and refunds are processed.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">2. Cancellation by User</h2>
                    <p className="mb-4">
                        If you need to cancel a confirmed booking, the refund amount will depend on how far in advance the cancellation is made relative to the scheduled event date.
                    </p>

                    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-gray-800 text-amber-500 uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-4">Time of Cancellation</th>
                                    <th className="px-6 py-4">Refund Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                <tr>
                                    <td className="px-6 py-4">Before Booking Acceptance</td>
                                    <td className="px-6 py-4 text-white">100% Refund</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">More than 7 days before event</td>
                                    <td className="px-6 py-4 text-white">90% Refund (10% Processing Fee)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">2 to 7 days before event</td>
                                    <td className="px-6 py-4 text-white">50% Refund</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">Less than 48 hours before event</td>
                                    <td className="px-6 py-4 text-red-400">No Refund</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">3. Cancellation by Service Provider</h2>
                    <p>
                        In the unlikely event that an Artist, Venue, or Event Manager cancels a confirmed booking:
                    </p>
                    <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
                        <li>You will receive a <strong>100% refund</strong> of the amount paid.</li>
                        <li>We will assist you in finding a suitable replacement for your event.</li>
                        <li>The Service Provider may be subject to penalties on the platform for such cancellations.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">4. Refund Process</h2>
                    <p>
                        Refunds will be processed to the original method of payment used during the booking.
                    </p>
                    <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
                        <li><strong>Processing Time:</strong> Refunds are initiated within 2 business days of the cancellation request.</li>
                        <li><strong>Credit Timeline:</strong> It may take 5-10 business days for the amount to reflect in your bank account or credit card statement, depending on your bank's policies.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">5. Disputes and Exceptions</h2>
                    <p>
                        If the service provided was not as described or if you faced significant issues during the event, you must report the issue to ManoIndia Support within 24 hours of the event completion.
                    </p>
                    <p className="mt-2">
                        We will investigate the matter and may, at our sole discretion, issue a partial or full refund based on the evidence provided.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">6. Contact for Refunds</h2>
                    <p>To request a cancellation or report a dispute, please contact our support team:</p>
                    <p className="mt-2">
                        Email: <a href="mailto:support@manoindia.in" className="text-amber-500 hover:underline">support@manoindia.in</a><br />
                        Phone: +91 87097 36094
                    </p>
                </section>
            </div>
        </div>
    );
}
