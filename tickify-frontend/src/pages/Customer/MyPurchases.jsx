import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import { FaFilePdf, FaRegTrashAlt } from 'react-icons/fa'; // PDF icon
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import logoImage from "../../assets/logo/Tickify-Logo-light.png";
import Swal from 'sweetalert2';
import Loader from '../../utils/Loader/Loader';

const MyPurchases = () => {
    const { token, isLoading, setIsLoading } = useAuth();
    const [payments, setPayments] = useState([]);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/my-payments', {
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                }
            });
            const paymentsData = response?.data?.payments || [];
            // console.log(paymentsData);
            setPayments(paymentsData);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token?.token) {
            fetchPayments();
        }

    }, [token]);

    // handle download invoice pdf 

    const convertToBase64 = async (url) => {
        try {
            const res = await fetch(url, { mode: 'cors' });
            const blob = await res.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.warn('Failed to load image:', error);
            return null;
        }
    };

    /**
     * Download a styled ticket PDF with logo, QR code, and details
     */
    const handleDownloadPDF = async (payment) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        let y = 20;

        // === 🖼️ Add Logo ===
        const logoBase64 = await convertToBase64(logoImage);

        if (logoBase64) {
            const logoWidth = 40;
            const logoHeight = 20;
            const logoX = (pageWidth - logoWidth) / 2;
            doc.addImage(logoBase64, 'PNG', logoX, y, logoWidth, logoHeight);
            y += logoHeight + 10;
        }

        // === 🎨 Centered Title ===
        doc.setFontSize(22);
        doc.setTextColor(37, 99, 235); // Tailwind blue
        doc.text('Tickify - Ticket Receipt', pageWidth / 2, y, { align: 'center' });
        y += 20;

        // === 🧾 Left-Aligned Ticket Details ===
        doc.setFontSize(12);
        doc.setTextColor(0);
        const details = [
            ['Ticket Number:', payment.stripe_payment_id],
            ['Event:', payment.event_title],
            ['Amount:', `৳${payment.amount}`],
            ['Date:', new Date(payment.created_at).toLocaleString()],
        ];

        details.forEach(([label, value]) => {
            doc.setFont(undefined, 'bold');
            doc.text(label, 20, y);
            doc.setFont(undefined, 'normal');
            doc.text(value.toString(), 60, y);
            y += 10;
        });

        y += 10;

        // === 🔳 Centered QR Code ===
        const qrData = `Ticket ID: ${payment.stripe_payment_id}`;
        const qrImage = await QRCode.toDataURL(qrData);
        const qrSize = 50;
        const qrX = (pageWidth - qrSize) / 2;

        doc.setFontSize(12);
        doc.text('Scan to verify ticket:', pageWidth / 2, y, { align: 'center' });
        doc.addImage(qrImage, 'PNG', qrX, y + 5, qrSize, qrSize);

        // === 📬 Footer ===
        doc.setFontSize(10);
        doc.setTextColor(120);
        doc.text('support@tickify.com | © 2025 Tickify', 20, 285);

        doc.save(`ticket-${payment.id}.pdf`);
    };

    // handle payment delete 
    const handleDelete = (paymentId) => {
        console.log(paymentId);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to Delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showClass: {
                popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
            },
            hideClass: {
                popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
            }
        }).then((result) => {
            // console.log(result)
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/my-payments/${paymentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token?.token}`,
                    },
                })
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "This payment has been deleted.",
                            icon: "success",
                            showClass: {
                                popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
                            },
                            hideClass: {
                                popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
                            }
                        });
                        fetchPayments();
                    })
                    .catch(error => {
                        console.error('Error deleting event:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the event.",
                            icon: "error",
                            showClass: {
                                popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
                            },
                            hideClass: {
                                popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
                            }
                        });
                    });
            }
        });
    };

    if (isLoading) return <div className="text-center text-lg">
        <Loader></Loader>
    </div>;


    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                🧾 My Payments
            </h2>

            {payments.length === 0 ? (
                <div className="text-gray-600 text-base">No payments found.</div>
            ) : (
                <div className="w-full overflow-x-auto">
                    <table className=" w-full bg-white rounded-md shadow-md border border-gray-200 text-sm sm:text-base">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
                            <tr>
                                <th className="px-4 py-3 text-left whitespace-nowrap">#</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Event</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Amount</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Date</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {payments.map((payment, index) => (
                                <tr
                                    key={payment.id}
                                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{payment.event_title}</td>
                                    <td className="px-4 py-3 text-green-600 font-semibold">
                                        ৳{payment.amount}
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(payment.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button
                                            className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
                                            onClick={() => handleDownloadPDF(payment)}
                                        >
                                            <FaFilePdf className="text-base sm:text-lg" title="Download" />
                                            {/* <span className="hidden sm:inline">Download</span> */}
                                        </button>

                                        <button
                                            className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
                                            onClick={() => handleDelete(payment?.id)}
                                        >
                                            <FaRegTrashAlt className="text-base sm:text-lg" title="Delete" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyPurchases;
