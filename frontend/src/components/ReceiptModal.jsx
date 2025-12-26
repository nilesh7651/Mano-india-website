import { useRef } from "react";
import Button from "./ui/Button";

export default function ReceiptModal({ booking, onClose }) {
    const printRef = useRef();

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload to restore event listeners
    };

    if (!booking) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white text-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Actions Header */}
                <div className="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-200">
                    <h2 className="font-bold text-gray-700">Receipt Viewer</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrint}
                            className="px-3 py-1.5 bg-gray-800 text-white rounded text-sm hover:bg-gray-700 transition"
                        >
                            🖨 Print
                        </button>
                        <button
                            onClick={onClose}
                            className="px-3 py-1.5 bg-transparent text-gray-500 hover:text-red-500 transition text-2xl leading-none"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                {/* Printable Area */}
                <div ref={printRef} className="p-8 overflow-y-auto bg-white" style={{ minHeight: "500px" }}>
                    {/* Header */}
                    <div className="text-center border-b-2 border-dashed border-gray-300 pb-6 mb-6">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">MANO INDIA</h1>
                        <p className="text-gray-500 text-sm mt-1">Event Booking Platform</p>
                        <div className="mt-4 inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200">
                            Payment Receipt
                        </div>
                    </div>

                    {/* Details Table */}
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Date</span>
                            <span className="font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Order ID</span>
                            <span className="font-mono text-gray-700">{booking.razorpayOrderId || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Payment ID</span>
                            <span className="font-mono text-gray-700">{booking.razorpayPaymentId || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Booking Ref</span>
                            <span className="font-mono text-gray-700">{booking._id?.slice(-8).toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="my-6 border-t border-gray-200"></div>

                    {/* Item Details */}
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Service</span>
                            <span className="font-bold text-lg text-gray-900">
                                {booking.artist?.name || booking.venue?.name}
                            </span>
                            <span className="text-sm text-gray-600">
                                {booking.artist ? "Artist Performance" : "Venue Booking"}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Event Details</span>
                            <p className="text-sm text-gray-700 flex justify-between">
                                <span>Date:</span>
                                <span className="font-medium">{new Date(booking.eventDate).toLocaleDateString()}</span>
                            </p>
                            <p className="text-sm text-gray-700 flex justify-between">
                                <span>Location:</span>
                                <span className="font-medium">{booking.eventLocation}</span>
                            </p>
                        </div>
                    </div>

                    <div className="my-6 border-t-2 border-dashed border-gray-300"></div>

                    {/* Total */}
                    <div className="flex justify-between items-end">
                        <span className="text-xl font-bold text-gray-900">Total Paid</span>
                        <span className="text-2xl font-extrabold text-gray-900">
                            ₹ {booking.amount?.toLocaleString()}
                        </span>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400">
                            Thank you for choosing Mano India. <br />
                            This is a computer generated receipt.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
