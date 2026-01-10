import { useRef } from "react";

export default function ReceiptModal({ booking, receipt, onClose }) {
    const printRef = useRef();

    const handlePrint = () => {
                const printContent = printRef.current?.innerHTML;
                if (!printContent) return;

                const popup = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");
                if (!popup) {
                        window.print();
                        return;
                }

                popup.document.open();
                popup.document.write(`<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Receipt</title>
        <style>
            body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 24px; color: #111; }
            * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        </style>
    </head>
    <body>
        ${printContent}
        <script>
            window.onload = () => { window.print(); window.close(); };
        <\/script>
    </body>
</html>`);
                popup.document.close();
    };

    const data = receipt || booking;
    const bookingRef = receipt?.booking || booking;

    if (!data) return null;

    const paidAt = receipt?.paidAt || bookingRef?.paidAt || new Date();
    const orderId = receipt?.razorpayOrderId || bookingRef?.razorpayOrderId;
    const paymentId = receipt?.razorpayPaymentId || bookingRef?.razorpayPaymentId;
    const amount = receipt?.amount ?? bookingRef?.amount;
    const eventDate = receipt?.eventDate || bookingRef?.eventDate;
    const eventLocation = receipt?.eventLocation || bookingRef?.eventLocation;

    const serviceName =
        receipt?.serviceName ||
        bookingRef?.artist?.name ||
        bookingRef?.venue?.name ||
        bookingRef?.eventManager?.companyName ||
        bookingRef?.eventManager?.name ||
        "Service";

    const serviceType =
        receipt?.providerRole ||
        (bookingRef?.artist ? "artist" : bookingRef?.venue ? "venue" : bookingRef?.eventManager ? "event_manager" : "service");

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
                            <span className="font-medium">{new Date(paidAt).toLocaleDateString()}</span>
                        </div>
                        {receipt?.invoiceNumber && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Invoice</span>
                                <span className="font-mono text-gray-700">{receipt.invoiceNumber}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-500">Order ID</span>
                            <span className="font-mono text-gray-700">{orderId || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Payment ID</span>
                            <span className="font-mono text-gray-700">{paymentId || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Booking Ref</span>
                            <span className="font-mono text-gray-700">{bookingRef?._id?.slice(-8).toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="my-6 border-t border-gray-200"></div>

                    {/* Item Details */}
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Service</span>
                            <span className="font-bold text-lg text-gray-900">
                                {serviceName}
                            </span>
                            <span className="text-sm text-gray-600">
                                {serviceType === "artist"
                                    ? "Artist Performance"
                                    : serviceType === "venue"
                                        ? "Venue Booking"
                                        : serviceType === "event_manager"
                                            ? "Event Management"
                                            : "Service"}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Event Details</span>
                            <p className="text-sm text-gray-700 flex justify-between">
                                <span>Date:</span>
                                <span className="font-medium">{eventDate ? new Date(eventDate).toLocaleDateString() : "N/A"}</span>
                            </p>
                            <p className="text-sm text-gray-700 flex justify-between">
                                <span>Location:</span>
                                <span className="font-medium">{eventLocation || "N/A"}</span>
                            </p>
                        </div>
                    </div>

                    <div className="my-6 border-t-2 border-dashed border-gray-300"></div>

                    {/* Total */}
                    <div className="flex justify-between items-end">
                        <span className="text-xl font-bold text-gray-900">Total Paid</span>
                        <span className="text-2xl font-extrabold text-gray-900">
                            ₹ {Number(amount || 0).toLocaleString()}
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
